import { useEffect, useState } from "react"
import { TUser } from "../../Types/TUser"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";
import Swal from "sweetalert2";
import { userActions } from "../../Store/userSlice";


const Crm = () => {

    const nav = useNavigate();

    const dispatch = useDispatch();

    const [users, setUsers] = useState<TUser[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

    const searchUsers = () => {
        return users?.filter((item: TUser) => item.name.first.includes(searchWord.toLocaleLowerCase()));
    }

    const navToUser = (user: TUser) => {
        nav("/profile/" + user._id);
    }

    const editUser = (user: TUser) => {
        nav("/edituser/" + user._id);
    }

    const getUsers = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users")
            setUsers(res.data);
            console.log(res.data);

        } catch (error) {
            console.log("error:", error)
        }
    }

    const patchBusinessStatus = async (user: TUser) => {

        Swal.fire({
            title: "Are you sure?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Change this account status to ${user?.isBusiness ? "personal" : "business"} ?`
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                    const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user?._id, { business: !user?.isBusiness });
                    dispatch(userActions.login(res.data));

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
                    const res = await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + user._id);
                    setUsers(res.data);

                    Swal.fire({
                        title: "Success",
                        text: "Account deleted",
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        timer: 1500,
                        timerProgressBar: true
                    });

                } catch (error) {
                    console.log(`error:`, error);
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
    }, [])

    return (
        <div>
            <h1>Crm</h1>
        </div>
    )
}

export default Crm