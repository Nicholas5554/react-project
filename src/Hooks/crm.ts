import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";
import { TUser } from "../Types/TUser";

export const crm = () => {

    const [users, setUsers] = useState<TUser[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

    const searchUsers = () => {
        return users?.filter((item: TUser) => item.name.first.includes(searchWord));
    }

    const getUsers = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
            setUsers(res.data);

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Could not get users",
                icon: "warning",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true
            });
        }
    }

    const patchBusinessStatus = async (user: TUser) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Change this account status to ${user?.isBusiness ? "personal" : "business"}`
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user?._id, { business: !user?.isBusiness });
                    getUsers();

                    Swal.fire({
                        title: "Success",
                        text: "Business status updated successfully",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    });

                } catch (error) {
                    console.log(`error:`, error);
                    Swal.fire({
                        title: "Error",
                        text: "Error updating business status",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }

            };
        });
    }

    const deleteUser = async (user: TUser) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            text: "This account will be deleted",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes delete this account"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user._id);
                    getUsers();

                    Swal.fire({
                        title: "Success",
                        text: "Account deleted",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    });

                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Error deleting account try again",
                        icon: "error",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            };
        });
    }



    useEffect(() => {
        getUsers()
    }, []);

    return ({
        searchUsers,
        patchBusinessStatus,
        deleteUser
    })
}