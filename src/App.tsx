
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./components/Shared/RouteGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/bigPie";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Favorites from "./Pages/Favorites/Favorites";
import Mycards from "./Pages/MyCards/MyCards";
import CreateCard from "./Pages/CreateCard/CreateCard";

const App = () => {

  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 dark:bg-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={
            <RouteGuard user={user!}>
              <Profile />
            </RouteGuard>} />

          <Route path="/mycards" element={
            <RouteGuard user={user!}>
              <Mycards />
            </RouteGuard>} />

          <Route path="/createcard" element={
            <RouteGuard user={user!}>
              <CreateCard />
            </RouteGuard>} />

          <Route path="/createcard" element={
            <RouteGuard user={user!}>
              <Profile />
            </RouteGuard>} />

          <Route path="/favorites" element={<Favorites />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Error />} />
          <Route path="/card/:id" element={<CardDetails />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
