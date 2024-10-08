import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editCardSchema } from "../components/validations/editCardSchema";


export const editCard = () => {
    const [cards, setCards] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const initialFormData = {
        "title": cards?.title,
        "subtitle": cards?.subtitle,
        "description": cards?.description,
        "phone": cards?.phone,
        "email": cards?.email,
        "web": cards?.web,
        "image": {
            "url": cards?.image?.url,
            "alt": cards?.image?.alt
        },
        "address": {
            "state": cards?.address?.state,
            "country": cards?.address?.country,
            "city": cards?.address?.city,
            "street": cards?.address?.street,
            "houseNumber": cards?.address?.houseNumber,
            "zip": cards?.address?.zip
        }
    }

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(editCardSchema)
    });

    useEffect(() => {
        if (cards) {
            reset(initialFormData);
        }
    }, [cards, reset]);

    const getData = async () => {
        try {
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
            setCards(res.data);
        } catch (err) {
            console.log("error:", err);
            Swal.fire({
                title: "error",
                text: "could not get the data",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cards?._id, form);
            setCards(res.data);
            Swal.fire({
                title: 'Success!',
                text: 'Card edited successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            nav("/mycards");

        } catch (error) {
            console.log(`error:`, error);
            Swal.fire({
                title: 'Error!',
                text: 'Card edit failed',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6'
            })
        }
    };

    const navToMyCards = () => {
        nav("/mycards")
    }

    useEffect(() => {
        getData();
    }, [id]);

    return ({
        cards,
        setCards,
        id,
        getData,
        onSubmit,
        navToMyCards,
        register,
        handleSubmit,
        errors,
        isValid
    });
}