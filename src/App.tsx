import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import CardsHolder from "./components/CardsHolder/CardsHolder";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 dark:bg-gray-800">
        <div className="flex flex-col items-start justify-center gap-4 text-center w-[98vw] h-[150px] dark:text-white border-b-2">
          <h1 className="text-5xl">cards page</h1>
          <p className="text-3xl ">here you can find some cards</p>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*  <Route path="/home" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>

        <CardsHolder />
      </main>
      <Footer />
    </>
  );
}

export default App;
