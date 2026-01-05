import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import User from './pages/User';
import Header from './components/Header.jsx';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
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
