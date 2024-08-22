import { userCard } from "../../userCard"
import Card from "../Card/Card"

const CardsHolder = () => {
    return (
        <div className="flex flex-row gap-5 mt-9">
            {userCard.map((card, index) => {
                return (
                    <Card card={card} key={index} />
                )
            })}
        </div>
    )
}

export default CardsHolder;