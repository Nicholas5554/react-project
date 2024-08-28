import { useForm } from "react-hook-form";
import { registerSchema } from "../../components/validations/registerSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";

const RegisterPage = () => {

    const registerForm = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: registerForm,
        mode: 'onChange',
        resolver: joiResolver(registerSchema)
    });

    const checkErrors = () => {
        return (
            errors.firstName === undefined &&
            errors.lastName === undefined &&
            errors.phone === undefined &&
            errors.email === undefined &&
            errors.password === undefined
        );
    };

    const submitForm = (form: any) => {
        console.log(form);

    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 p-4 mt-20 rounded-lg shadow-lg">

            <h1 className="text-2xl font-bold dark:text-white">Register</h1>

            <FloatingLabel className="dark:text-white"
                type="firstName"
                variant="standard"
                label="First Name"
                {...register("firstName")}
            />
            <span className="text-sm text-red-500">{errors.firstName?.message}</span>

            <FloatingLabel className="dark:text-white"
                type="lastName"
                variant="standard"
                label="Last Name"
                {...register("lastName")}
            />
            <span className="text-sm text-red-500">{errors.lastName?.message}</span>

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

            <Button type="submit" disabled={!checkErrors()} className=" dark:text-white">
                Register
            </Button>

        </form>
    )
}

export default RegisterPage;