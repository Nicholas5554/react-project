import HomeCard from "../../components/HomeCard/HomeCard";



const Home = () => {

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 text-center w-4/6 h-[150px] dark:text-white border-b-2">
                <h1 className="text-5xl">Cards Page</h1>
                <p className="text-3xl ">Here you can find all sort of cards</p>
            </div>
            <HomeCard />
        </>
    )
}


export default Home;