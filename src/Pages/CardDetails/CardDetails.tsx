import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
        setCard(res.data);
    };

    useEffect(() => {
        getData();
    }, [])

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