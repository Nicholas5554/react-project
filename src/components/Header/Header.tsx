import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/bigPie";
import { userActions } from "../../Store/userSlice";
import Swal from "sweetalert2";
import { searchActions } from "../../Store/SearchSlice";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const Header = () => {

    const loc = useLocation().pathname;
    const user = useSelector((state: TRootState) => state.userSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Successfully logged out",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    timer: 1500,
                    timerProgressBar: true,
                });
                localStorage.removeItem("token");
                dispatch(userActions.logout());
                nav('/');
            };
        });
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axios.defaults.headers.common["x-auth-token"] = token;
                    const decodedToken = jwtDecode(token) as { _id: string };
                    const response = await axios.get(
                        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + decodedToken._id
                    );
                    dispatch(userActions.login(response.data));
                    ;
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, [dispatch]);

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