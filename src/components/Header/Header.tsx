import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { header } from "../../Hooks/header";


const Header = () => {

    const {
        loc,
        logout,
        search,
        user
    } = header();

    return (
        <Navbar fluid className="list-none">
            <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="flex flex-row gap-2">
                <img src="../public/dark-mouse.jpeg" alt="dark-mouse" className="w-[30px] h-[30px]" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">React Project</span>
            </Navbar.Link>

            <Navbar.Toggle />
            <Navbar.Collapse>

                <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="text-lg ">
                    Home
                </Navbar.Link>

                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'} className="text-lg">
                    About
                </Navbar.Link>

                {user && (<Navbar.Link as={Link} href="/profile" to="/profile" active={loc === '/profile'} className="text-lg">
                    Profile
                </Navbar.Link>)}

                {user && (<Navbar.Link as={Link} href="/favorites" to="/favorites" active={loc === '/favorites'} className="text-lg">
                    Favorites
                </Navbar.Link>)}

                {user?.isBusiness && (<Navbar.Link as={Link} href="/mycards" to="/mycards" active={loc === '/mycards'} className="text-lg">
                    My cards
                </Navbar.Link>)}

                {user?.isAdmin && (<Navbar.Link as={Link} href="/crm" to="/crm" active={loc === '/crm'} className="text-lg">
                    Crm
                </Navbar.Link>)}

                <Navbar.Brand>
                    <TextInput rightIcon={FaSearch} onChange={search} />
                </Navbar.Brand>

                <DarkThemeToggle />

                {!user && (<Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'} className="text-lg">
                    Register
                </Navbar.Link>)}

                {!user && (
                    <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'} className="text-lg">
                        Login
                    </Navbar.Link>
                )}


                {user && (
                    <Navbar.Link className="text-lg cursor-pointer" onClick={logout} >
                        Logout
                    </Navbar.Link>
                )}
            </Navbar.Collapse>

        </Navbar>
    );
};

export default Header;