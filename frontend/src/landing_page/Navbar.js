import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search button clicked");
    };

    return (
        <nav
            className="navbar navbar-expand-lg border-bottom"
            style={{
                backgroundColor: "#1e231c",
                borderBottom: "10px solid gray",
                height: "80px",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            {/* Left Section: Logo */}
            <a className="navbar-brand" href="#">
                <img src="media/images/logo.png" style={{ width: "50px" }} alt="Logo" />
            </a>

            {/* Center Section: Search Bar */}
            <form className="d-flex align-items-center" onSubmit={handleSearchSubmit} style={{ gap: "0.5rem" }}>
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ width: "300px", backgroundColor: "white" }}
                />
                <button className="btn" type="submit" style={{ backgroundColor: '#96e856', color: 'black',height:'37.6px',justifyContent:'center' }}>
                    Search
                </button>
            </form>

            <ul className="navbar-nav d-flex align-items-center" style={{ gap: "1rem", marginBottom: 0 }}>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="#">
                        Chats
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
             
             
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="#">
                        News
                    </Link>
                </li>
<<<<<<< HEAD
               
=======
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="#">
                        {/* Funds */}
                        About
                    </Link>
                </li>
>>>>>>> 91bb1887cb67055799332a4b4ee04fefc26cc896
                <li className="nav-item">
                    <Link className="nav-link active text-white" to="/auth">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="profile">
                        <i className="fas fa-user fa-lg text-white"></i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
