import { Button } from "flowbite-react";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Error = () => {

    const path = useNavigate();
    const pathHome = () => {
        path('/home')
    }

    return (
        <div>
            <h1>Error 404</h1>
            <Button onClick={pathHome}>Go Home</Button>
            <TbError404 className="w-[400px] h-[400px]" />
        </div>
    )
}

export default Error;