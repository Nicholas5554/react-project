import { useForm } from "react-hook-form";
import { registerSchema } from "../../components/validations/registerSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const nav = useNavigate();

    const initialForm = {
        "name": {
            "first": "",
            "middle": "",
            "last": ""
        },
        "phone": "",
        "email": "",
        "password": "",
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
        },
        "isBusiness": false
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialForm,
        mode: "onChange",
        resolver: joiResolver(registerSchema)
    });

    const submitForm = async (form: any) => {
        console.log("Form data:", form);

        try {
            const res = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", form);
            console.log(res.data);
            Swal.fire({
                title: `Welcome ${form.name.first} ${form.name.last}`,
                text: "successfully Registerd",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: "#3085d6",
            });
            nav("/login");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error response:", error.response?.data);
                Swal.fire({
                    title: "Error",
                    text: "User Already Registerd",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            } else {
                console.log("Unexpected Error:", error);
                Swal.fire({
                    title: "Error",
                    text: "Unexpected Error Please Try again",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 p-4 rounded-lg shadow-lg">

            <h1 className="text-2xl font-bold dark:text-white">Register</h1>

            <FloatingLabel className="dark:text-white"
                type="text"
                variant="standard"
                label="First Name"
                {...register("name.first")}
            />
            <span className="text-sm text-red-500">{errors.name?.first?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="text"
                variant="standard"
                label="Middle Name"
                {...register("name.middle")}
            />
            <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="text"
                variant="standard"
                label="Last Name"
                {...register("name.last")}
            />
            <span className="text-sm text-red-500">{errors.name?.last?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="phone"
                variant="standard"
                label="phone"
                {...register("phone")}
            />
            <span className="text-sm text-red-500">{errors.phone?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="email"
                variant="standard"
                label="Email"
                {...register("email")}
            />
            <span className="text-sm text-red-500">{errors.email?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="password"
                variant="standard"
                label="Password"
                {...register("password")}
            />
            <span className="text-sm text-red-500">{errors.password?.message}</span>

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

            <Label htmlFor="isBusiness">is Business?</Label>
            <Checkbox {...register("isBusiness")} />
            <span className="text-sm text-red-500">{errors.isBusiness?.message}</span>

            <Button type="submit" disabled={!isValid} className="dark:text-white">
                Register
            </Button>

        </form>
    )
}

export default RegisterPage;