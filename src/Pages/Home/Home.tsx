import Card from "../../components/Card/Card";

const Home = () => {
    return (
        <>
            <div className="flex flex-col items-start justify-center gap-4 text-center w-[98vw] h-[150px] dark:text-white border-b-2">
                <h1 className="text-5xl">Cards Page</h1>
                <p className="text-3xl ">Here you can find some cards</p>
            </div>
            <Card />
        </>
    )
}


export default Home;