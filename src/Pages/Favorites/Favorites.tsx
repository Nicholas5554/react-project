import { FaHeart } from "react-icons/fa";
import { favorites } from "../../Hooks/favorites";
import { Card, Pagination } from "flowbite-react";


const Favorites = () => {
    const {
        likedCard,
        navToCard,
        likeDislikeCard,
        user,
        currentPage,
        totalPages,
        onPageChange,
        currentCards
    } = favorites();

    return (
        <div className="flex flex-col items-center justify-start gap-2 text-center dark:text-white">
            <h1 className="text-2xl">Favorites</h1>
            {user.isLoggedIn && <p className="flex flex-row items-center justify-center gap-2 text-xl">The one's that get more <FaHeart color="red" /> </p>}

            <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {currentCards.map((card: TCard) => {
                    return (
                        <Card key={card._id} className="flex items-center justify-center w-auto">
                            <img src={card.image.url} alt={card.image.alt} className="object-fill w-72 h-[200px] cursor-pointer m-auto" onClick={() => navToCard(card._id)} />
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
            <Pagination className="mb-5"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </div>
    )
}

export default Favorites;