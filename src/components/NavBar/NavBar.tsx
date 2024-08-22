import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {

    const loc = useLocation().pathname;
    console.log(loc);
    return (
        <Navbar fluid>

            <Navbar.Brand as={Link} href="https://flowbite-react.com">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <DarkThemeToggle />
                <Navbar.Link as={Link} href="/home" to="/home" active={loc === '/home' || loc === '/'}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'}>
                    About
                </Navbar.Link>
                <Navbar.Brand>
                    <TextInput rightIcon={FaSearch} />
                </Navbar.Brand>
            </Navbar.Collapse>

        </Navbar>
    );
};

export default NavBar;