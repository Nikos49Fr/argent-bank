import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../services/api';
import { logout } from '../features/auth/authSlice';
import { api } from '../services/api';
import logo from '../assets/img/argentBankLogo.png';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const { data } = useGetUserProfileQuery(undefined, { skip: !token });
    const userName = data?.body?.userName;

    const handleLogout = () => {
        dispatch(logout());
        dispatch(api.util.resetApiState());
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {token ? (
                <div>
                    <Link className="main-nav-item" to="/user">
                        <i className="fa fa-user-circle"></i>
                        {userName || 'Profile'}
                    </Link>
                    <Link
                        className="main-nav-item"
                        to="/"
                        onClick={handleLogout}
                    >
                        <i className="fa fa-power-off"></i>
                        Sign Out
                    </Link>
                </div>
            ) : (
                <Link className="main-nav-item" to="/sign-in">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            )}
        </nav>
    );
}
