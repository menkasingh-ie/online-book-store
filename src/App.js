import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList';
import NavBar from './components/NavBar';
import BookDetails from './components/BookDetails';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';
import Login from './login/Login.js';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loggedIn, setLoggedIn] = useState(() => {
        return localStorage.getItem('loggedIn') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    
    return (
        <Router>
            <CartProvider>
                {loggedIn && <NavBar onSearch={handleSearch} setLoggedIn={setLoggedIn} />}
                {<NavBar onSearch={handleSearch} />}
                <Routes>
                    <Route path="/" element={loggedIn ? <Navigate to="/booklist" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/booklist" element={loggedIn ? <BookList searchQuery={searchQuery} /> : <Navigate to="/login" />} />
                    <Route path="/bookdetails/:id" element={loggedIn ? <BookDetails /> : <Navigate to="/login" />} />
                    <Route path="/cart" element={loggedIn ? <ShoppingCart /> : <Navigate to="/login" />} />
                    <Route path="/checkout" element={loggedIn ? <Checkout /> : <Navigate to="/login" />} />
                
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;



