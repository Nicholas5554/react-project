import { Card } from "flowbite-react";
import { BiPlus } from "react-icons/bi";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { myCards } from "../../Hooks/myCards";

const Mycards = () => {

    const {
        user,
        navToCard,
        likeDislikeCard,
        isLikedCard,
        searchCards,
        deleteCard,
        editCard,
        navToCreateCard
    } = myCards();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">
            <h1 className="text-2xl">My Cards</h1>
            <p className="text-lg">Welcome My cards</p>
            {user.isLoggedIn && <p className="flex flex-row items-center justify-center gap-2 text-lg">Made by you <FaHeart color="red" /> </p>}

            <div className="flex flex-wrap items-center justify-center w-1/1">
                {searchCards().map((card: TCard) => {
                    return (
                        <Card key={card._id} className="flex items-center justify-center w-56 m-auto">
                            <img src={card.image.url} alt={card.image.alt} className="object-fill h-[200px] cursor-pointer" onClick={() => navToCard(card._id)} />
                            <h1>{card.title}</h1>
                            <h3 className="text-[14px]">{card.subtitle}</h3>
                            {user.user && < FaHeart
                                size={35}
                                className="m-auto cursor-pointer"
                                color={isLikedCard(card) ? "red" : "black"}
                                onClick={() => likeDislikeCard(card)}
                            />}
                            <FaPencil
                                size={30}
                                className="m-auto cursor-pointer"
                                onClick={() => editCard(card)}
                            />
                            <FaTrash
                                size={30}
                                onClick={() => deleteCard(card)}
                                className="m-auto cursor-pointer"
                            />
                        </Card>
                    )
                })}
            </div>
            {user.user?.isBusiness && <div className="flex items-center justify-center p-3 text-white transition-colors bg-gray-500 rounded-full cursor-pointer hover:bg-gray-600" onClick={navToCreateCard}>
                <p className="text-lg font-semibold">Create a new card</p>
                <BiPlus
                    size={35}
                />
            </div>}
        </div>
    );
};

export default Mycards;