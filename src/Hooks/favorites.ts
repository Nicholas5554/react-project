import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";


export const favorites = () => {
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
    }, []);

    return ({
        cards,
        searchCards,
        likedCard,
        navToCard,
        likeDislikeCard,
        user
    })
}