import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../StyleSheets/LogoutButton.css'

function LogoutButton() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully!");

        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <Link to='/Login'>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </Link>
        </>
    );
}

export default LogoutButton;
