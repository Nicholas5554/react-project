import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { joiResolver } from "@hookform/resolvers/joi";
import { FloatingLabel, Button } from "flowbite-react";
import { TUser } from "../../Types/TUser";
import { editUserSchema } from "../../components/validations/editUserSchema";


const EditUserDetails = () => {

    const [userInfo, setUserInfo] = useState<TUser>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const initialUser = {
        name: {
            first: userInfo?.name.first,
            middle: userInfo?.name.middle,
            last: userInfo?.name.last
        },
        phone: userInfo?.phone,
        image: {
            url: userInfo?.image.url,
            alt: userInfo?.image.alt
        },
        address: {
            state: userInfo?.address.state,
            country: userInfo?.address.country,
            city: userInfo?.address.city,
            street: userInfo?.address.street,
            houseNumber: userInfo?.address.houseNumber,
            zip: userInfo?.address.zip
        }
    }

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialUser,
        mode: "onChange",
        resolver: joiResolver(editUserSchema)
    });

    useEffect(() => {
        if (userInfo) {
            reset(initialUser)
        }
    }, [userInfo, reset]);

    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);
            setUserInfo(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(`error:`, error);
            Swal.fire({
                title: "error",
                text: "error getting your user",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            })
        }
    };

    const submitForm = async (form: typeof initialUser) => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + userInfo?._id, form);
            console.log(res.data);

            Swal.fire({
                title: "success",
                text: "user updated successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            nav("/profile")
        } catch (error) {
            console.log(`error:`, error);
            Swal.fire({
                title: "error",
                text: "error updating user",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            })
        }
    }

    useEffect(() => {
        getData();
    }, [id]);


    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7">

            <h1 className="text-2xl font-bold dark:text-white">Edit User Details</h1>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="First Name"
                    defaultValue={userInfo?.name.first}
                    {...register("name.first")}
                />
                <span className="text-sm text-red-500">{errors.name?.first?.message}</span>


                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="Middle Name"
                    defaultValue={userInfo?.name.middle}
                    {...register("name.middle")}
                />
                <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="Last Name"
                    defaultValue={userInfo?.name.last}
                    {...register("name.last")}
                />
                <span className="text-sm text-red-500">{errors.name?.last?.message}</span>

                <FloatingLabel className="dark:text-white"
                    type="phone"
                    variant="standard"
                    label="Phone"
                    defaultValue={userInfo?.phone}
                    {...register("phone")}
                />
                <span className="text-sm text-red-500">{errors.phone?.message}</span>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="image url"
                    defaultValue={userInfo?.image.url}
                    {...register("image.url")}
                />
                <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="image alt"
                    defaultValue={userInfo?.image.alt}
                    {...register("image.alt")}
                />
                <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="state"
                    defaultValue={userInfo?.address.state}
                    {...register("address.state")}
                />
                <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="country"
                    defaultValue={userInfo?.address.country}
                    {...register("address.country")}
                />
                <span className="text-sm text-red-500">{errors.address?.country?.message}</span>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="city"
                    defaultValue={userInfo?.address.city}
                    {...register("address.city")}
                />
                <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

                <FloatingLabel className="dark:text-white"
                    type="text"
                    variant="standard"
                    label="street"
                    defaultValue={userInfo?.address.street}
                    {...register("address.street")}
                />
                <span className="text-sm text-red-500">{errors.address?.street?.message}</span>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <FloatingLabel className="dark:text-white"
                    type="number"
                    variant="standard"
                    label="houseNumber"
                    defaultValue={userInfo?.address.houseNumber}
                    {...register("address.houseNumber")}
                />
                <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

                <FloatingLabel className="dark:text-white"
                    type="number"
                    variant="standard"
                    label="zip"
                    defaultValue={userInfo?.address.zip}
                    {...register("address.zip")}
                />
                <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
            </div>

            <Button type="submit" disabled={!isValid} className="dark:text-white">
                Save Changes
            </Button>

        </form>
    )
}

export default EditUserDetails;