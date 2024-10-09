import { FaHeart } from "react-icons/fa";
import { homeCardFuncs } from "../../Hooks/homeCard";
import { Card } from "flowbite-react";

const HomeCard = () => {

    const {
        searchCards,
        likedCard,
        navToCard,
        likeDislikeCard,
        user
    } = homeCardFuncs();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">

            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {searchCards().map((card: TCard) => {
                    return (
                        <Card key={card._id} className="flex items-center justify-center w-auto text-center">
                            <img src={card.image.url} alt={card.image.alt} className="object-fill m-auto w-72 h-[200px] cursor-pointer" onClick={() => navToCard(card._id)} />
                            <h1>{card.title}</h1>
                            <h3>{card.subtitle}</h3>
                            <h3>{card.phone}</h3>
                            {user.user && < FaHeart
                                size={35}
                                className="m-auto cursor-pointer"
                                color={likedCard(card) ? "red" : "black"}
                                onClick={() => likeDislikeCard(card)}
                            />}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeCard;