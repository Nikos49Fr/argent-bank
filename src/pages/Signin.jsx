import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/api';
import { setToken, setRememberFlag } from '../features/auth/authSlice';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberState, setRememberState] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            const token = res.body.token;
            dispatch(setToken(token));
            dispatch(setRememberFlag(rememberState));
            if (rememberState) localStorage.setItem('token', token);
            else localStorage.removeItem('token');
            navigate('/user');
        } catch (err) {
            // err.data.message dispo pour affichage
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
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
                            checked={rememberState}
                            onChange={(e) => setRememberState(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error?.data?.message && (
                        <p className="error">{error.data.message}</p>
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
