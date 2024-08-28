import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 dark:bg-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
