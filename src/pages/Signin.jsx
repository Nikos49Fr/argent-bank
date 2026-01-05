import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../services/api';
import { setToken } from '../features/auth/authSlice';

export default function Signin() {
    const token = useSelector((state) => state.auth.token);
    if (token) return <Navigate to="/user" replace />;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setrememberMe] = useState(false);
    const [unexpectedError, setUnexpectedError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUnexpectedError('');
        try {
            const res = await login({ email, password }).unwrap();
            const token = res.body.token;
            dispatch(setToken(token));
            if (rememberMe) localStorage.setItem('token', token);
            else localStorage.removeItem('token');
            navigate('/user');
        } catch (err) {
            if (!err?.data?.message) {
                setUnexpectedError('Unexpected error. Please try again.');
            }
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setrememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error?.data?.message && (
                        <p className="error">{error.data.message}</p>
                    )}
                    {unexpectedError && (
                        <p className="error">{unexpectedError}</p>
                    )}
                    <button
                        type="submit"
                        className="sign-in-button"
                        disabled={isLoading}
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}
