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

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;
    const onPageChange = (page: number) => setCurrentPage(page);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchCards().slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchCards().length / cardsPerPage);

    const fetchCards = async () => {
        try {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            cardsSet(res.data);
        } catch (err: any) {
            Swal.fire({
                title: "Error",
                text: "Could not get cards",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            })
        }
    }

    const likeDislikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id)
            if (res.status === 200) {

                const cardIndex = cards.indexOf(card);
                const userIndex = card.likes.indexOf(user.user!._id);
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

                if (userIndex === -1) {
                    newCards[cardIndex].likes.push(user.user!._id);
                    ToastSweet.fire({
                        title: 'Card Liked',
                        icon: 'success',
                        toast: true,
                    });

                } else {
                    newCards[cardIndex].likes.splice(userIndex, 1);
                    ToastSweet.fire({
                        title: 'Card Disliked',
                        icon: 'warning',
                        toast: true,
                    });
                }

                cardsSet(newCards);
            }
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "could not like/dislike",
                icon: "error",
                timerProgressBar: true,
                confirmButtonColor: '#3085d6',
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
        user,
        currentPage,
        totalPages,
        onPageChange,
        currentCards
    })
}