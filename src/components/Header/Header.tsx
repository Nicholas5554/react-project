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
        <Navbar fluid className="list-none ">
            <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="flex flex-row gap-2">
                <img src="../public/dark-mouse.jpeg" alt="dark-mouse" className="w-[30px] h-[30px]" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">React Project</span>
            </Navbar.Link>

            <Navbar.Toggle />
            <Navbar.Collapse>
                <DarkThemeToggle />
                <Navbar.Brand>
                    <TextInput rightIcon={FaSearch} onChange={search} />
                </Navbar.Brand>

                <Navbar.Link as={Link} href="/" to="/" active={loc === '/'}>
                    Home
                </Navbar.Link>

                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'}>
                    About
                </Navbar.Link>

                {user && (<Navbar.Link as={Link} href="/profile" to="/profile" active={loc === '/profile'}>
                    Profile
                </Navbar.Link>)}

                {user && (<Navbar.Link as={Link} href="/favorites" to="/favorites" active={loc === '/favorites'}>
                    Favorites
                </Navbar.Link>)}

                {user?.isBusiness && (<Navbar.Link as={Link} href="/mycards" to="/mycards" active={loc === '/mycards'}>
                    My cards
                </Navbar.Link>)}

                {user?.isAdmin && (<Navbar.Link as={Link} href="/crm" to="/crm" active={loc === '/crm'}>
                    Crm
                </Navbar.Link>)}

                {!user && (<Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'}>
                    Register
                </Navbar.Link>)}

                {!user && (
                    <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'}>
                        Login
                    </Navbar.Link>
                )}

                {user && (
                    <Navbar.Link className="cursor-pointer" onClick={logout}>
                        Logout
                    </Navbar.Link>
                )}

            </Navbar.Collapse>

        </Navbar>
    );
};

export default Header;