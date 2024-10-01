import { FaHeart } from "react-icons/fa";
import { card } from "../../Hooks/card";

const Card = () => {

    const {
        searchCards,
        likedCard,
        navToCard,
        likeDislikeCard,
        user
    } = card();

    return (
        <div className="flex flex-wrap w-[100vw]   justify-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 gap-7 shadow">
            {
                searchCards()!.map((card: TCard) => {
                    return (
                        <div key={card._id} className="w-[365px] h-[550px] shadow-lg dark:shadow-xl dark:shadow-blue-500/50">
                            <img className="rounded-t-lg w-[100%] h-[200px] object-cover cursor-pointer" src={card.image.url} alt="image" onClick={() => navToCard(card._id)} />
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                                <p className="mb-3 font-bold text-gray-700 dark:text-slate-300 h-[20px]">{card.subtitle}</p>
                                <hr />
                                <p className="mt-3 mb-3 font-semibold text-gray-700 dark:text-gray-400">{card.phone}</p>
                                <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">{card.email}</p>
                                <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">{card.description}</p>
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

export default Card;