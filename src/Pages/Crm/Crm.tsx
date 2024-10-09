import { useEffect, useState } from "react"
import { TUser } from "../../Types/TUser"
import axios from "axios"
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";



const Crm = () => {

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
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Biz Status</th>
                            <th scope="col" className="px-6 py-3">Change Biz</th>
                            <th scope="col" className="px-6 py-3">Delete Account</th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchUsers().map((user: TUser) => (
                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name.first}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBusiness ? "Business" : "Personal"}
                                </td>

                                <td>
                                    <FaPencil
                                        size={20}
                                        className="m-auto cursor-pointer "
                                        onClick={() => patchBusinessStatus(user)}
                                    />
                                </td>

                                <td>
                                    <FaTrash
                                        size={20}
                                        onClick={() => deleteUser(user)}
                                        className="m-auto cursor-pointer"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Crm



{/*     <div className="flex flex-wrap items-center justify-center gap-4 w-1/1">
                {searchUsers().map((user: TUser) => {
                    return (
                        <Card key={user._id} className="flex items-center justify-center w-auto text-center">
                            <img src={user.image.url} alt={user.image.alt} className="object-fill m-auto w-72 h-[200px]" />
                            <h1>{user.name.first}</h1>
                            <h3>{user.email}</h3>
                            <h3>{user.phone}</h3>
                            <h3>{user.isBusiness ? "Business" : "Personal"}</h3>

                            <FaPencil
                                size={30}
                                className="m-auto cursor-pointer"
                                onClick={() => patchBusinessStatus(user)}
                            />
                            <FaTrash
                                size={30}
                                onClick={() => deleteUser(user)}
                                className="m-auto cursor-pointer"
                            />
                        </Card>
                    )
                })}
            </div> */}