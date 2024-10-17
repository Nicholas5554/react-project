import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CreateCardSchema } from "../components/validations/createCardSchema";

export const createCard = () => {
    const nav = useNavigate();

    const initialFromData = {
        "title": "",
        "subtitle": "",
        "description": "",
        "phone": "",
        "email": "",
        "web": "",
        "image": {
            "url": "",
            "alt": ""
        },
        "address": {
            "state": "",
            "country": "",
            "city": "",
            "street": "",
            "houseNumber": 0,
            "zip": 0
        }
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFromData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema)
    });

    const onSubmit = async (form: typeof initialFromData) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            Swal.fire({
                title: 'Success!',
                text: 'Card created successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            nav("/mycards");

        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'Card created failed',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6'
            })
        }
    };

    const navToMyCards = () => {
        nav("/mycards")
    }

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
        navToMyCards
    });
};