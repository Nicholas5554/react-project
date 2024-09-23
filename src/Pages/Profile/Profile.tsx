import { useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";

const Profile = () => {

    const user = useSelector((state: TRootState) => state.userSlice.user);

    return (
        <div className="text-center dark:text-white w-[90vw]">

            <h1 className="text-3xl font-bold text-teal-500">Profile Page</h1>
            <br />
            <h2 className="font-bold text-teal-300">{`welcome ${user?.name.first} ${user?.name.last} to your profile page`}</h2>
            <br />
            <h1 className="font-bold text-teal-500">About the Cards Creation Showcase</h1>
            <p className="size-auto">
                The Cards Creation Showcase is an API-powered platform designed to let users create and display custom cards.
                Whether you're a card enthusiast or just enjoy creating something unique, this tool allows you to personalize your cards
                and share them with the community.
            </p>
            <br />
            <h2 className="font-bold text-teal-500">Features</h2>
            <ul>
                {user?.isBusiness && user.isAdmin &&
                    <li>Create custom cards with attributes like names, images, and descriptions.</li>}

                <li>View a collection of cards created by other users and get inspired.</li>

                {user?.isBusiness && user.isAdmin &&
                    <li>Edit or delete your cards at any time to keep your collection updated.</li>}

                <li>Explore a wide variety of cards created using the API.</li>

                {user?.isBusiness && user.isAdmin &&
                    <li>Responsive design, allowing you to create and manage cards on both desktop and mobile devices.</li>}
            </ul>
            <br />
            <h2 className="font-bold text-teal-500">Technologies Used</h2>
            <p>
                This project leverages modern technologies to ensure a smooth and dynamic card creation experience:
            </p>
            <ul>
                <li><strong>React:</strong> For building the interactive user interface.</li>
                <li><strong>API Integration:</strong> To allow dynamic card creation with custom attributes.</li>
                <li><strong>Tailwind:</strong> For styling the components and making the UI visually appealing.</li>
            </ul>
            <br />
            <h2 className="font-bold text-teal-500">How It Works</h2>
            <p>
                The platform is structured as a single-page application, where users interact with the API to create new cards.
                The cards are dynamically displayed on the page, and you can explore different user creations in real-time.
                React state management ensures that the data is always up-to-date.
            </p>
            <p>
                This project is perfect for anyone interested in learning API integration or practicing React. It demonstrates how to
                manage dynamic content in a user-friendly and engaging way.
            </p>
        </div>

    )
}

export default Profile;