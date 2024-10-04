import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/FIrebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SessionExpire from '../inActivity_check/SessionExpire';

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const authToken = sessionStorage?.getItem("authToken");
        if (authToken) {
            return <Navigate to="/dashboard/" />;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("email", loginData.email);
            sessionStorage.setItem("userUID:- ", userCredential.user.uid);

            navigate("/dashboard");

            setLoginData({
                email: "",
                password: ""
            })
        } catch (error) {
            console.log(error);
            toast.error("Invalid usernam and password",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    progress: undefined,
                });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
             <SessionExpire />
             
            <div className="container  w-25 shadow-lg p-4 rounded-2">
                <h4 className='text-center'>Login Form</h4>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={loginData.email}
                            onChange={handleChange}
                            placeholder='abcd@example.com'
                            required
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder='************'
                            required
                        />
                    </div>

                    <small className='text-decoration-none'>
                        <NavLink to="forgot_password" className='text-decoration-none'>
                            Forgot Password?
                        </NavLink>
                    </small>

                    <div className='mt-3 text-center mb-2'>
                        <button type="submit" className="btn btn-primary w-50">Login</button>
                    </div>

                    <small className='mt-5'>Don't have account?
                        <NavLink to="register" className="text-decoration-none">Register</NavLink>
                    </small>
                </form>
            </div>
        </div>
    )
};

export default Login
