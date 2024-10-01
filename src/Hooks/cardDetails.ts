import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const cardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const getData = async () => {
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
        setCard(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return ({
        card,
        setCard,
        id,
        getData
    })
}