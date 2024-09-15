import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../components/validations/loginSchema";
import { Button, FloatingLabel } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/userSlice";
import { decode } from "../../Services/tokenService";

const LoginPage = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();

    const loginForm = {
        "email": "",
        "password": "",
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: loginForm,
        mode: 'onChange',
        resolver: joiResolver(loginSchema)
    });

    const submitLogin = async (form: any) => {

        try {
            const token = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
                form,
            );

            localStorage.setItem("token", token.data);
            const id = decode(token.data)._id;
            axios.defaults.headers.common["x-auth-token"] = token.data;
            const user = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id,
            );
            dispatch(userActions.login(user.data));
            console.log(token.data);
            Swal.fire({
                title: "Welcome Back",
                text: "successfully Logged In",
                icon: "success",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: "#3085d6",
            });
            nav("/");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error response:", error.response?.data);
                Swal.fire({
                    title: "Error",
                    text: "Email or Password Invalid",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            } else {
                console.log("Unexpected error:", error);
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
    }

    return (
        <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col gap-4 p-4 mt-20 rounded-lg shadow-lg">

            <h1 className="text-2xl font-bold dark:text-white">Login</h1>

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

            <Button type="submit" disabled={!isValid} className="dark:text-white">
                Login
            </Button>

        </form>
    )
}


export default LoginPage;

