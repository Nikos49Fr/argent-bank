import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import User from './pages/User';
import Header from './components/Header.jsx';
import Footer from './components/Footer';
import { setToken, setRememberFlag } from './features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
            dispatch(setRememberFlag(true));
        }
    }, [dispatch]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<Signin />}></Route>
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    }
                ></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
