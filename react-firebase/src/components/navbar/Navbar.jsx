import { signOut } from 'firebase/auth';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/FIrebase';

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            sessionStorage.clear();

            navigate("/login", { replace: true });
        }).catch((error) => {
            console.error("Error during logout:", error);
        });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/dashboard" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="#">About</Link>
                            </li>

                        </ul>
                        <form className="d-flex me-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        <span className='d-flex justify-content-end ms-2  pe-3 '>
                            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
