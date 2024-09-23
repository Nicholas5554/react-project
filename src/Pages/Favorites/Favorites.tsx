import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/bigPie";
import Swal from "sweetalert2";


const Favorites = () => {
    const nav = useNavigate();

    const [cards, cardsSet] = useState<TCard[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);
    const user = useSelector((state: TRootState) => state.userSlice)

    const searchCards = () => {
        return cards?.filter((item: TCard) => item.title.includes(searchWord.toLocaleLowerCase()) && item.likes.includes(user.user!._id));
    }

    const likedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else {
            return false;
        }
    }

    const navToCard = (id: string) => {
        nav("/card/" + id);
    }

    const fetchCards = async () => {
        try {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            cardsSet(res.data);
            console.log(res.data);
        } catch (err: any) {
            console.log('error:', err.data);
        }
    }

    const likeDislikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id)
            if (res.status === 200) {

                const cardIndex = cards.indexOf(card);
                const isLiked = cards[cardIndex].likes.includes(user.user!._id);
                const newCards = [...cards];

                const ToastSweet = Swal.mixin({
                    toast: true,
                    position: "top-right",
                    customClass: {
                        popup: 'colored-toast',
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });

                if (isLiked) {
                    newCards[cardIndex].likes.splice(cardIndex);
                    ToastSweet.fire({
                        title: 'Card disliked',
                        icon: 'warning',
                        toast: true,
                    });

                } else {
                    newCards[cardIndex].likes.push(user.user!._id);
                    ToastSweet.fire({
                        title: 'Card liked',
                        icon: 'success',
                        toast: true,
                    });
                }
                cardsSet(newCards);
            }
        } catch (err) {
            console.log("error: ", err);
            Swal.fire({
                title: "Error",
                text: "could not like/dislike",
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            })
        }
    }



    useEffect(() => {
        fetchCards();
    }, [])

    return (
        <div className="flex flex-wrap w-[100vw]   justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-2">
            {
                searchCards()!.map((card: TCard) => {
                    return (
                        <div key={card._id} className="w-[365px] h-[550px]">
                            <img className="rounded-t-lg w-[350px] h-[200px] object-cover cursor-pointer" src={card.image.url} alt="image" onClick={() => navToCard(card._id)} />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[20px]">{card.subtitle}</p>
                                <hr />
                                <p className="mt-3 mb-3 font-normal text-gray-700 dark:text-gray-400">{card.phone}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.email}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
                                <br />
                                {user.user && <FaHeart
                                    size={30}
                                    className="m-auto cursor-pointer"
                                    color={likedCard(card) ? "red" : "#575f69"}
                                    onClick={() => likeDislikeCard(card)}
                                />}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;