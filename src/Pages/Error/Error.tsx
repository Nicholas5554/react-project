import { Button } from "flowbite-react";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Error = () => {

    const path = useNavigate();
    const pathHome = () => {
        path('/');
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-5/5">
                <h1 className="mt-6">Error 404</h1>
                <Button onClick={pathHome}>Go Home</Button>
                <TbError404 className="w-[400px] h-[200px]" />
            </div>
        </>
    )
}

export default Error;