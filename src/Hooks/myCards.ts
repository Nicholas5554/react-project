import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";


export const myCards = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

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
        return cards.filter((item: TCard) => item.title.includes(searchWord.toLocaleLowerCase()));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false
    };

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

                setCards(newCards);
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

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;
    const onPageChange = (page: number) => setCurrentPage(page);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = searchCards().slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(searchCards().length / cardsPerPage);

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        }

        const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards');
        setCards(res.data);
    }

    useEffect(() => {
        getData();
    }, [])

    const user = useSelector(
        (state: TRootState) => state.userSlice,
    );


    return ({
        cards,
        searchCards,
        isLikedCard,
        likeDislikeCard,
        deleteCard,
        editCard,
        navToCard,
        navToCreateCard,
        user,
        currentPage,
        totalPages,
        onPageChange,
        currentCards
    })
}