import { useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";

const Profile = () => {

    const user = useSelector((state: TRootState) => state.userSlice.user);

    return (
        <div className="text-white dark:">
            <h1>Profile Page</h1>
            <p >Welcome {user?.name.first + " " + user?.name.last}</p>
        </div>
    )
}

export default Profile;