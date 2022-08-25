import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions, userInfo } from "../../../store/auth-slice";
import logo from '../../../assets/images/banner1.jpg';


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authState = useSelector(userInfo);
    const isAuth = authState.isAuthenticated;

    const handleLogout = () => {
        dispatch(authActions.logout());
        if (localStorage.getItem('flagToken')) {
            localStorage.removeItem('flagToken');
            navigate('/login', { replace: true });
        };
     };

    return (
        <header>
            <div className="container-fluid p-0 fixed-top">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to={'/home'}>
                            <img src={logo} alt="" />&nbsp;Art Design
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="me-auto" />
                            <div className="navbar-nav">
                                {isAuth ?
                                    <>
                                        <NavLink className={(navData) => navData.isActive ? 'nav-item active' : ''} to='/home'>
                                            <li className="nav-link">Home</li>
                                        </NavLink>
                                        <li className="nav-link cursor_pointer" onClick={handleLogout}>Log Out</li>
                                    </>
                                    :
                                    <NavLink className={(navData) => navData.isActive ? 'nav-item active' : ''} to='/login'>
                                        <li className="nav-link">Log In</li>
                                    </NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;