import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
import { registerPage } from "../../Hooks/registerPage";

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm
    } = registerPage();

    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7">

            <h1 className="text-2xl font-bold dark:text-white">Register</h1>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="First Name"
                        {...register("name.first")}
                    />
                    <span className="text-sm text-red-500">{errors.name?.first?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Middle Name"
                        {...register("name.middle")}
                    />
                    <span className="text-sm text-red-500 ">{errors.name?.middle?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Last Name"
                        {...register("name.last")}
                    />
                    <span className="text-sm text-red-500">{errors.name?.last?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="phone"
                        variant="standard"
                        label="phone"
                        {...register("phone")}
                    />
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="email"
                        variant="standard"
                        label="Email"
                        {...register("email")}
                    />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="password"
                        variant="standard"
                        label="Password"
                        {...register("password")}
                    />
                    <span className="text-sm text-red-500">{errors.password?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        {...register("image.url")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        {...register("image.alt")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="state"
                        {...register("address.state")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.state?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        {...register("address.country")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="city"
                        {...register("address.city")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        {...register("address.street")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="houseNumber"
                        {...register("address.houseNumber")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="zip"
                        {...register("address.zip")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                </div>
            </div>

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