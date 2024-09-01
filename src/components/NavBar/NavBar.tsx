import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {

    const loc = useLocation().pathname;

    return (
        <Navbar fluid className="list-none ">
            <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} >
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">React Project</span>
            </Navbar.Link>

            <Navbar.Toggle />
            <Navbar.Collapse>
                <DarkThemeToggle />
                <Navbar.Link as={Link} href="/" to="/" active={loc === '/'}>
                    Home
                </Navbar.Link>

                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'}>
                    About
                </Navbar.Link>

                <Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'}>
                    Register
                </Navbar.Link>

                <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'}>
                    Login
                </Navbar.Link>

                <Navbar.Brand>
                    <TextInput rightIcon={FaSearch} />
                </Navbar.Brand>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default NavBar;