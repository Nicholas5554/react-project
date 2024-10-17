import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginSchema } from "../components/validations/loginSchema";
import { decode } from "../Services/tokenService";
import { userActions } from "../Store/userSlice";


export const loginPage = () => {
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
            Swal.fire({
                title: `welcome back ${user.data.name.first}`,
                text: "successfully Logged In",
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                confirmButtonColor: "#3085d6",
            });
            nav("/");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    title: "Error",
                    text: "Email or Password Invalid",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                });
            } else {
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

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        submitLogin
    });
}