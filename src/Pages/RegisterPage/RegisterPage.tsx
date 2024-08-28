import { useForm } from "react-hook-form";

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
        resolver: 
    })

    return (

    )
}

export default RegisterPage;