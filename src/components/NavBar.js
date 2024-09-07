import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import cartImg from '../assets/images/shopping-cart.png';
// import { Navbar, Container } from 'react-bootstrap';
import SearchBar from './SearchBar';

const NavBar = ({ onSearch, setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('loggedIn');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand logo" href="/">eBookStore</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                    </ul> */}
                {/* </div> */}
                <SearchBar onSearch={onSearch} />
                <div className='w-25 d-flex justify-content-end'>
                    <Link to="/cart" className='mr-30'>
                        <img src={cartImg}  className='img-fluid cartImg' alt="Shopping Cart" />
                        <span className='cart-text'>Cart</span>
                    </Link>
                    <button className="my-2 my-sm-0 logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;






