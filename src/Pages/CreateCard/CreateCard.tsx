
import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form";
import { CreateCardSchema } from "../../components/validations/createCardSchema";
import axios from "axios";
import Swal from "sweetalert2";
import { FloatingLabel, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {

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

            const res = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            console.log(res.data);
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
            console.log(`error:`, error);

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

    return (
        <>
            <form className="flex flex-col gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold dark:text-white">Create card</h1>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="title"
                        {...register("title")}
                    />
                    <span className="text-sm text-red-500">{errors.title?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="subtitle"
                        {...register("subtitle")}
                    />
                    <span className="text-sm text-red-500">{errors.subtitle?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="description"
                        {...register("description")}
                    />
                    <span className="text-sm text-red-500">{errors.description?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="phone"
                        {...register("phone")}
                    />

                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="email"
                        {...register("email")}
                    />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="web"
                        {...register("web")}
                    />
                    <span className="text-sm text-red-500">{errors.web?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        {...register("image.url")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        {...register("image.alt")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="state"
                        {...register("address.state")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        {...register("address.country")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="city"
                        {...register("address.city")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        {...register("address.street")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
                </div>

                <div className="flex flex-row gap-6 m-auto w-max">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="houseNumber"
                        {...register("address.houseNumber")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="zip"
                        {...register("address.zip")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                </div>

                <button className="h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToMyCards}>Go Back</button>
                <Button type="submit" disabled={!isValid} className="dark:text-white">Create card</Button>

            </form>
        </>
    );
};

export default CreateCard;