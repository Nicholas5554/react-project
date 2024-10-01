import { cardDetails } from "../../Hooks/cardDetails";

const CardDetails = () => {

    const { card } = cardDetails();

    return (
        <div className="flex flex-col items-center justify-start gap-4 dark:text-white w-2/7 h-[100vh]">
            <h1>{card && card?.title!}</h1>
            <img src={card?.image.url} alt={card?.image.alt} className="w-2/7 h-1/2" />
            <h3> {card && card?.subtitle!}</h3>
            <p>Email: {card && card?.email!}</p>
            <p>Phone: {card && card.phone!}</p>
            <p className="w-auto text-center">Website: {card && card.image.url}</p>
            <p>Address: {card && card.address.city && card.address.street}</p>
        </div>
    )
};

export default CardDetails;