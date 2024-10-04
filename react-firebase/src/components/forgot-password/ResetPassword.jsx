import React, { useState } from 'react'
import { auth } from '../firebase/FIrebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmPasswordReset } from 'firebase/auth';
import Notification from '../navbar/Notification';

function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showNotify, setShowNotify] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmits = async (e) => {
        e.preventDefault();

        const queryParam = new URLSearchParams(location.search);
        const oobCode = queryParam.get("oobCode");

        try {
            await confirmPasswordReset(auth, oobCode, password);

            setShowNotify(true);
            setPassword("");

            setTimeout(() => {
                setShowNotify(false);
                navigate("/login");
            }, 10000)

        } catch (error) {
            console.log(error);
            toast.error("Invalide password", {
                position: "top-center",
                autoClose: 4000
            });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>

            {showNotify ? <Notification /> : ""}
            <div className="container col-8 col-md-5 col-lg-4 shadow-lg p-4 rounded-2">
                <h4 className='text-center'>Reset Password</h4>

                <form onSubmit={handleSubmits}>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            placeholder='***********'
                            required
                        />
                    </div>


                    <div className='mt-3 text-center mb-2'>
                        <button type="submit" className="btn btn-primary w-50">Change password</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ResetPassword;
