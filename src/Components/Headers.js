import React from 'react'
import { Link } from 'react-router-dom'
import '../StyleSheets/Headers.css'

function Headers() {


    return (
        <>
            <nav className="nav-bar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nav-bar collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className='set-links' to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='set-links' to="/Products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='set-links' to="/Register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='set-links' to="/Login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='set-links' to="/Chat">Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='set-links' to="/Cart">Cart</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Headers

