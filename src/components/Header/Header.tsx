import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";
import { userActions } from "../../Store/userSlice";
import Swal from "sweetalert2";

const Header = () => {

    const loc = useLocation().pathname;
    const user = useSelector((state: TRootState) => state.userSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logout = () => {
        dispatch(userActions.logout());
        Swal.fire({
            title: "see you soon",
            icon: "info",
            timer: 2000,
            timerProgressBar: true
        });
        nav('/');
    }

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
                    <TextInput rightIcon={FaSearch} />
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

                {!user && (<Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'}>
                    Register
                </Navbar.Link>)}

                {!user && (
                    <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'}>
                        Login
                    </Navbar.Link>
                )}

                {user && (
                    <Navbar.Link className="text-white cursor-pointer" onClick={logout}>
                        Logout
                    </Navbar.Link>
                )}

            </Navbar.Collapse>

        </Navbar>
    );
};

export default Header;