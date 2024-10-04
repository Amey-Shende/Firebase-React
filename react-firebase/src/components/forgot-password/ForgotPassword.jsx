import React, { useState } from 'react'
import { auth } from '../firebase/FIrebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value)
    };
    // const actionCodeSettings = {
    //     url: "http://localhost:3000/"

    // }

    const handleSubmits = async (e) => {
        e.preventDefault();
        try {
            const temp = await sendPasswordResetEmail(auth, email);
            console.log(temp);

            toast.success("Password reset email sent! Check your inbox.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                progress: undefined
            });
            setEmail("");
            setTimeout(() => {
                navigate("/login");
            }, 3000)

        } catch (error) {
            console.log(error);
            toast.error("Invalide Email", {
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                progress: undefined,
            });
        }
    };



    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <ToastContainer />
            <div className="container col-8 col-md-5 col-lg-4 shadow-lg p-4 rounded-2">
                <h4 className='text-center'>Forgot Password</h4>

                <form onSubmit={handleSubmits}>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleChange}
                            placeholder='abcd@example.com'
                            required
                        />
                    </div>


                    <div className='mt-3 text-center mb-2'>
                        <button type="submit" className="btn btn-primary w-50">Send Reset Email</button>
                    </div>

                    <small className='mt-5 '>
                        <NavLink to="/" className="text-decoration-none">Back to Login</NavLink>
                    </small>
                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;
