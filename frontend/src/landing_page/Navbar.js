
import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        // Add your search logic here, for example, capturing the input value and performing a search
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
            }}
        >
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="media/images/logo.png" style={{ width: "25%" }} alt="Logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto" style={{ gap: "1rem" }} onSubmit={handleSearchSubmit}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ width: "300px" }} // Adjust the width as needed
                        />
                        <button className="btn" type="submit" style={{ backgroundColor: '#96e856', color: 'black' }}>
                            Search
                        </button>
                    </form>
                    <ul className="navbar-nav mb-lg-0" style={{ gap: "1rem" }}>
                        <li className="nav-item">
                            <a className="nav-link active text-white" aria-current="page" href="#">
                                Chats
                            </a>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link active text-white" href="#">
                                Dashboard
                            </a> */}
                                <Link className="nav-link active text-white" to="/dashboard">
                              Dashboard
                               </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="#">
                                Orders
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="#">
                                Holdings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="#">
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="#">
                                Funds
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active text-white" href="#">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fas fa-user fa-2x text-white "></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

