import { Card } from "flowbite-react";
import { BiPlus } from "react-icons/bi";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { myCards } from "../../Hooks/myCards";

const Mycards = () => {

    const {
        user,
        navToCard,
        likeUnlikeCard,
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

            <div className="flex flex-wrap w-1/1 ">
                {searchCards().map((item: TCard) => {
                    return (
                        <Card key={item._id} className="flex flex-row items-center justify-center w-60">
                            <img src={item.image.url} alt={item.image.alt} className="object-fill h-[200px] cursor-pointer" onClick={() => navToCard(item._id)} />
                            <h1>{item.title}</h1>
                            <h3>{item.subtitle}</h3>
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
            {user.user?.isBusiness && <div className="flex bg-gray-500 rounded-full cursor-pointer">
                <BiPlus
                    size={40}
                    onClick={navToCreateCard}
                />
            </div>}
        </div>
    );
};

export default Mycards;