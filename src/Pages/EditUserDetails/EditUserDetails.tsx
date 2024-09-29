import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { joiResolver } from "@hookform/resolvers/joi";
import { FloatingLabel, Button } from "flowbite-react";
import { TUser } from "../../Types/TUser";
import { editUserSchema } from "../../components/validations/editUserSchema";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/userSlice";


const EditUserDetails = () => {

    const [userInfo, setUserInfo] = useState<TUser>();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

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
                text: "user info updated successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            nav("/profile");
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

    const patchBusinessStatus = async () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `change your status to ${!userInfo?.isBusiness ? "business" : "personal"}`
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + userInfo?._id, { business: !userInfo?.isBusiness });
                    console.log(res.data);

                    Swal.fire({
                        title: "success",
                        text: "business status updated successfully",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    });
                } catch (error) {
                    console.log(`error:`, error);
                    Swal.fire({
                        title: "error",
                        text: "error updating business status",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }

            };
        });
    }

    const deleteUser = () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            text: "your account will be deleted",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "yes delete my account"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    const res = await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + userInfo?._id);
                    console.log(res.data);
                    dispatch(userActions.logout());
                    localStorage.removeItem("token");

                    Swal.fire({
                        title: "success",
                        text: "account deleted",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    });
                    nav("/")
                } catch (error) {
                    console.log(`error:`, error);
                    Swal.fire({
                        title: "error",
                        text: "error deleting account try again",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            };
        });
    }

    const navToProfile = () => {
        nav("/profile")
    }

    useEffect(() => {
        getData();
    }, [id]);



    return (
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col justify-center gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg w-2/7">

            <h1 className="text-2xl font-bold dark:text-white">Edit User Details</h1>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="First Name"
                        defaultValue={userInfo?.name.first}
                        {...register("name.first")}
                    />
                    <span className="text-sm text-red-500">{errors.name?.first?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Middle Name"
                        defaultValue={userInfo?.name.middle}
                        {...register("name.middle")}
                    />
                    <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="Last Name"
                        defaultValue={userInfo?.name.last}
                        {...register("name.last")}
                    />
                    <span className="text-sm text-red-500">{errors.name?.last?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="phone"
                        variant="standard"
                        label="Phone"
                        defaultValue={userInfo?.phone}
                        {...register("phone")}
                    />
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>
                </div>
            </div>

            <div className="flex flex-row gap-6 m-auto w-max">
                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image url"
                        defaultValue={userInfo?.image.url}
                        {...register("image.url")}
                    />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="image alt"
                        defaultValue={userInfo?.image.alt}
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
                        defaultValue={userInfo?.address.state}
                        {...register("address.state")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.state?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="country"
                        defaultValue={userInfo?.address.country}
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
                        defaultValue={userInfo?.address.city}
                        {...register("address.city")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="text"
                        variant="standard"
                        label="street"
                        defaultValue={userInfo?.address.street}
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
                        defaultValue={userInfo?.address.houseNumber}
                        {...register("address.houseNumber")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>
                </div>

                <div className="flex flex-col">
                    <FloatingLabel className="dark:text-white"
                        type="number"
                        variant="standard"
                        label="zip"
                        defaultValue={userInfo?.address.zip}
                        {...register("address.zip")}
                    />
                    <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>
                </div>
            </div>

            <button className="h-10 text-sm text-white transition-colors rounded-md bg-neutral-500 hover:bg-neutral-600" onClick={navToProfile}>
                Go Back
            </button>

            <Button type="submit" disabled={!isValid} className="dark:text-white">
                Save Changes
            </Button>

            <Button className=" dark:text-white" onClick={patchBusinessStatus}>
                Change business status?
            </Button>

            <button type="button" className="h-10 text-sm text-white transition-colors bg-red-600 rounded-md hover:bg-red-800" onClick={deleteUser}>
                Delete my account?
            </button>



        </form>
    )
}

export default EditUserDetails;