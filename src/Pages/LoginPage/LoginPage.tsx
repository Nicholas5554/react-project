import { Button, FloatingLabel } from "flowbite-react";
import { loginPage } from "../../Hooks/loginPage";


const LoginPage = () => {

    const {
        register,
        handleSubmit,
        errors,
        isValid,
        submitLogin
    } = loginPage();

    return (
        <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col items-center justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-1/1">

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

            <Button type="submit" disabled={!isValid} className="w-full dark:text-white">
                Login
            </Button>

        </form>
    )
}


export default LoginPage;

