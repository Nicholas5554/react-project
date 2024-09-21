import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { FloatingLabel, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { editCardSchema } from "../../components/validations/editCardSchema";
import { useEffect, useState } from "react";

const EditCard = () => {

    const [cards, setCards] = useState<TCard>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const initialFromData = {
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
        defaultValues: initialFromData,
        mode: "onChange",
        resolver: joiResolver(editCardSchema)
    });

    useEffect(() => {
        if (cards) {
            reset(initialFromData);
        }
    }, [cards, reset]);

    const getData = async () => {
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id);
        setCards(res.data);
    }

    const onSubmit = async (form: typeof initialFromData) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cards?._id, form);
            console.log(`res:`, res);
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

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <>
            <form className="flex flex-col justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7"
                onSubmit={handleSubmit(onSubmit)
                }
            >
                <h1 className="text-2xl font-bold dark:text-white">Edit card</h1>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="title"
                        defaultValue={cards?.title}
                        {...register("title")}
                    />
                    <span className="text-sm text-red-500">{errors.title?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="subtitle"
                        defaultValue={cards?.subtitle}
                        {...register("subtitle")}
                    />
                    <span className="text-sm text-red-500">{errors.subtitle?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="description"
                        defaultValue={cards?.description}
                        {...register("description")}
                    />
                    <span className="text-sm text-red-500">{errors.description?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="phone"
                        defaultValue={cards?.phone}
                        {...register("phone")}
                    />

                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="email"
                        defaultValue={cards?.email}
                        {...register("email")}
                    />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="web"
                        defaultValue={cards?.web}
                        {...register("web")}
                    />
                    <span className="text-sm text-red-500">{errors.web?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        defaultValue={cards?.image?.url}
                        {...register("image.url")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        defaultValue={cards?.image?.alt}
                        {...register("image.alt")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="state"
                        defaultValue={cards?.address?.state}
                        {...register("address.state")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        defaultValue={cards?.address?.country}
                        {...register("address.country")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="city"
                        defaultValue={cards?.address?.city}
                        {...register("address.city")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        defaultValue={cards?.address?.street}
                        {...register("address.street")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
                </div>

                <div className="flex flex-row w-auto gap-6 m-auto ">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="houseNumber"
                        defaultValue={cards?.address?.houseNumber}
                        {...register("address.houseNumber")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="zip"
                        defaultValue={cards?.address?.zip}
                        {...register("address.zip")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                </div>

                <Button type="submit" disabled={!isValid} className="dark:text-white">Edit card</Button>

            </form>
        </>
    );
};

export default EditCard;