import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUserSchema } from "../components/validations/editUserSchema";
import { userActions } from "../Store/userSlice";
import { TUser } from "../Types/TUser";

export const editUser = () => {

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
            setUserInfo(res.data);

            Swal.fire({
                title: "success",
                text: "user info updated successfully",
                icon: "success",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
            navToProfile();
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
                    dispatch(userActions.login(res.data));

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

    return ({
        userInfo,
        register,
        handleSubmit,
        errors,
        isValid,
        submitForm,
        patchBusinessStatus,
        deleteUser,
        navToProfile
    })
}