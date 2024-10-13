import { TUser } from "../../Types/TUser"
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { crm } from "../../Hooks/crm";



const Crm = () => {
    const {
        searchUsers,
        patchBusinessStatus,
        deleteUser
    } = crm();

    return (
        <>
            <div className="relative overflow-x-auto w-[90%]">
                <h1 className="mb-2 text-4xl font-bold dark:text-white">Users Chart</h1>
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

                    <tbody className="">
                        {searchUsers().map((user: TUser) => (
                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name.first}
                                </th>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.phone}
                                </td>
                                <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.isBusiness ? "Business" : "Personal"}
                                </td>

                                <td>
                                    <FaPencil
                                        size={20}
                                        className="m-auto text-gray-900 cursor-pointer whitespace-nowrap dark:text-white"
                                        onClick={() => patchBusinessStatus(user)}
                                    />
                                </td>

                                <td>
                                    <FaTrash
                                        size={20}
                                        className="m-auto text-gray-900 cursor-pointer whitespace-nowrap dark:text-white"
                                        onClick={() => deleteUser(user)}
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