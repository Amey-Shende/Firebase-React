import React, { useState } from 'react'
import { getDatabase, ref, update } from 'firebase/database'
import { app } from "../firebase/FIrebase.js";
import { useLocation, useNavigate } from 'react-router-dom';


function UpdateData() {

    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({
        first_name: location.state[1].first_name,
        last_name: location.state[1].last_name,
        date_of_birth: location.state[1].date_of_birth,
        country: location.state[1].country,
        phone: location.state[1].phone,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const updateRef = ref(db, 'user/' + location.state[0]);
        update(updateRef, data);

        setData({
            first_name: "",
            last_name: "",
            date_of_birth: "",
            country: "",
            phone: "",
        });

        navigate("/dashboard");

    };
    return (
        <div>
          
            <div className="container mt-5 w-25 shadow-lg p-4 rounded-2">
                <h4 className='text-center'>Update Form</h4>

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
                            required
                        />
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </div> */}

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
                            required
                        />
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </div> */}

                    <div className='mt-2 text-center'>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default UpdateData
