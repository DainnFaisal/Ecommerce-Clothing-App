import React from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';
import { useForm } from 'react-hook-form';
import '../StyleSheets/Register.css';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerUser = async (data) => {
        const { username, email, password } = data;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Saving user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
            });

            console.log("User registered with:", user.email);

            // Saving Firebase Authentication token in local storage
            const userToken = await user.getIdToken(true);
            localStorage.setItem('token', userToken);

        } catch (error) {
            console.error("Error registering user: ", error);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Checking if user exists in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const docSnapshot = await getDoc(userDocRef);
            if (!docSnapshot.exists()) {

                // If user doesn't exist, adding user data to Firestore
                await setDoc(userDocRef, {
                    username: user.displayName,
                    email: user.email,
                });
            }

            console.log("User signed in with Google:", user.displayName);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <>
            <div className='container'>

                <div className='register-form '>
                    <h3 className='register-heading'>Register:</h3>
                    <form onSubmit={handleSubmit(registerUser)}>
                        <input
                            className='input-fields'
                            type="text"
                            placeholder="Username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        <br />
                        {errors.username && <p className='error-text'>{errors.username.message}</p>}

                        <br />
                        <input
                            className='input-fields'
                            type="email"
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <br />
                        {errors.email && <p className='error-text'>{errors.email.message}</p>}

                        <br />
                        <input
                            className='input-fields'
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    message: 'Password must contain at least 8 characters, including uppercase, lowercase, and numbers',
                                },
                            })}
                        />
                        <br />
                        {errors.password && <p className='error-text'>{errors.password.message}</p>}

                        <br />
                        <button className="register-btn" type="submit">Register</button>

                        <br/>
                        <p className='google-authentication' onClick={signInWithGoogle}>Sign in With Google</p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
