
import axios from "axios";
/* import { Button } from "flowbite-react"; */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";
import { useNavigate, useParams } from "react-router-dom";
import { decode } from "../../Services/tokenService";
import LikeButton from "../LikeButton/LikeButton";

const Card = () => {

    const nav = useNavigate();

    const [cards, cardsSet] = useState([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

    const searchCards = () => {
        return cards?.filter((item: TCard) => item.title.includes(searchWord.toLocaleLowerCase()));
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

    const { cardId } = useParams<{ cardId: string }>()

    const likeCards = async () => {
        const like = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId);
        localStorage.setItem("like", like.data);
        axios.defaults.headers.common["x-auth-token"] = like.data;
    }

    useEffect(() => {
        fetchCards();
    }, [])

    return (
        <div className="flex flex-wrap w-[100vw]  justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-2">
            {
                searchCards()!.map((item: TCard) => {
                    return (
                        <div key={item._id} className="w-[365px] cursor-pointer" onClick={() => navToCard(item._id)}>
                            <img className="rounded-t-lg w-[350px] h-[200px] object-cover" src={item.image.url} alt="" />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[20px]">{item.subtitle}</p>
                                <hr />
                                <p className="mt-3 mb-3 font-normal text-gray-700 dark:text-gray-400">{item.phone}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.email}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                                {/* <Button href={item.image.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Button> */}
                                <LikeButton />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Card;