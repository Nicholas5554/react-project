import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../components/validations/loginSchema";
import { Button, FloatingLabel } from "flowbite-react";

const LoginPage = () => {

    const loginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: loginForm,
        mode: 'onChange',
        resolver: joiResolver(loginSchema)
    });

    const checkErrors = () => {
        return (
            errors.email === undefined &&
            errors.password === undefined
        )
    }

    const submitLogin = (form: any) => {
        console.log(form);
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

            <Button type="submit" disabled={!checkErrors()} className="dark:text-white">
                Login
            </Button>

        </form>
    )

}

export default LoginPage;