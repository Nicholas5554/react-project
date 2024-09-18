import axios from "axios";
import { Card } from "flowbite-react";
import { useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../Store/bigPie";
import Swal from "sweetalert2";

const Mycards = () => {

    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);
    console.log(searchWord);

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


    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
        if (res.status === 200) {



            const index = cards.indexOf(card);
            const ifLiked = cards[index].likes.includes(user.user!._id);
            const newCards = [...cards];
            if (ifLiked) {
                newCards[index].likes.splice(index);
                ToastSweet.fire({
                    title: 'Card Disliked',
                    icon: 'warning',
                    toast: true,
                });
            } else {
                newCards[index].likes.push(user.user!._id);
                ToastSweet.fire({
                    title: 'Card Liked',
                    icon: 'success',
                    toast: true,
                });
            }
            setCards(newCards);
        }
    };



    const deleteCard = async (card: TCard) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it"

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
                    const index = cards.indexOf(card);
                    const newCards = [...cards];

                    if (res) {
                        Swal.fire({
                            title: "Card Deleted",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        newCards.splice(index, 1);
                        setCards(newCards);
                    }
                };
            });
            ;
        } catch (error) {
            console.log(`error:`, error);

            ToastSweet.fire({
                title: 'Card was not deleted',
                icon: "error",
                toast: true,
            });
        }
    };

    const editCard = (card: TCard) => {
        nav(`/editcard/${card._id}`);
    }


    const navToCard = (id: string) => {
        nav(`/card/${id}`);
    }

    const navToCreateCard = () => {
        nav('/createcard');
    }

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        }

        const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards');
        console.log(res.data);
        setCards(res.data);
    }

    useEffect(() => {
        getData();
    }, [])

    const user = useSelector(
        (state: TRootState) => state.userSlice,
    );


    return (
        <div className="flex flex-col items-center justify-start gap-2 dark:text-white">
            <h1 className="text-2xl">My Cards</h1>
            <p className="text-lg">Welcome My cards</p>
            {user.isLoggedIn && <p className="text-lg">Made by you</p>}

            <div className="flex flex-wrap w-4/5 m-auto">
                {searchCards().map((item: TCard) => {
                    return (
                        <Card key={item._id} className="flex flex-row items-center justify-center">
                            <img src={item.image.url} alt={item.image.alt} className="object-fill h-[200px] cursor-pointer" onClick={() => navToCard(item._id)} />
                            <h1>{item.title}</h1>
                            <h3>{item.subtitle}</h3>
                            {/* <p>{item.description}</p> */}
                            {user.user && < FaHeart
                                size={35}
                                className="m-auto cursor-pointer"
                                color={isLikedCard(item) ? "red" : "black"}
                                onClick={() => likeUnlikeCard(item)}
                            />}
                            <FaPencil
                                size={30}
                                className="m-auto cursor-pointer"
                                onClick={() => editCard(item)}
                            />
                            <FaTrash
                                size={30}
                                onClick={() => deleteCard(item)}
                                className="m-auto cursor-pointer"
                            />
                        </Card>
                    )
                })}
            </div>
            <div className="flex bg-gray-500 rounded-full cursor-pointer">
                <BiPlus
                    size={30}
                    onClick={navToCreateCard}
                />
            </div>
        </div>
    );
};

export default Mycards;