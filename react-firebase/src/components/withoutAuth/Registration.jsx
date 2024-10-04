import React, { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { app, auth } from "../firebase/FIrebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


function Registration() {

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
        country: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            // console.log("userCredential", userCredential)
            const db = getDatabase(app);

            set(ref(db, "user/" + userCredential.user.uid), {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                date_of_birth: data.date_of_birth,
                country: data.country,
                phone: data.phone,
            });

            toast.success('user Register Sucessfully', { position: "top-center", autoClose: 3000 });
            setData({
                first_name: "",
                last_name: "",
                email: "",
                date_of_birth: "",
                country: "",
                phone: "",
                password: "",
            })
        } catch (error) {
            console.log(error);
            toast.error("Email already register", { position: "top-center", autoClose: "3000" });
        }
    };

    return (
        <div>
            <div className="container mt-5 w-25 shadow-lg p-4 rounded-2">
                <h4 className='text-center'>Registration Form</h4>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            id="first_name"
                            value={data.first_name}
                            onChange={handleChange}
                            placeholder='Enter the first name'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            id="last_name"
                            value={data.last_name}
                            onChange={handleChange}
                            placeholder='Enter the last name'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder='abcd@example.com'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date_of_birth"
                            id="date_of_birth"
                            value={data.date_of_birth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select
                            className="form-control"
                            name="country"
                            id="country"
                            value={data.country}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="INDIA">INDIA</option>
                            <option value="USA">USA</option>
                            <option value="Canada">Canada</option>
                            <option value="UK">UK</option>
                            <option value="RUSSIA">RUSSIA</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            id="phone"
                            value={data.phone}
                            onChange={handleChange}
                            placeholder='Enter the phone number '
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
                            value={data.password}
                            onChange={handleChange}
                            placeholder='************'
                            required
                        />
                    </div>

                    <div className='mt-3 text-center'>
                        <button type="submit" className="btn btn-primary w-50">Submit</button>
                    </div>

                    <small>
                        Already have account?
                        <NavLink to="/" className="ms-2">
                            Login </NavLink>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Registration
