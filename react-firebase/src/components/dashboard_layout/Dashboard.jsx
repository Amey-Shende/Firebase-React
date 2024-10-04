import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, } from 'firebase/database';
import { app } from "../firebase/FIrebase.js";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function Dashboard() {

    const [datalist, setDataList] = useState(null);
    const navigate = useNavigate();

    const apiData = async () => {
        const db = getDatabase(app);
        const response = ref(db, "user")
        onValue(response, (snapshot) => {
            const data = snapshot.val()
            setDataList(data);
        })
    };

    useEffect(() => {
        apiData();
    }, []);

    const handleDelete = (id) => {
        const db = getDatabase(app);
        const removeRef = ref(db, "user/" + id);
        remove(removeRef)
            .then(() => {
                toast.success("Record Deleted Sucessfully",
                    { position: "top-center", autoClose: 3000 }
                );
            })
            .catch((error) => {
                toast.error("Record not deleted!", { position: "top-center", autoClose: 3000 })
                console.log(error);
            })
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-2'>
                <div className='w-75 mt-5'>

                    <table className='table table-striped  shadow'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Country</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                datalist &&
                                Object.entries(datalist).map((val) => (
                                    <tr key={val[0]}>
                                        <td>{val[1].first_name}</td>
                                        <td>{val[1].last_name}</td>
                                        <td>{val[1].email}</td>
                                        <td>{val[1].date_of_birth}</td>
                                        <td>{val[1].country}</td>
                                        <td>{val[1].phone}</td>
                                        <td >
                                            <button className='text-success border-0 bg-transparent'
                                                onClick={() => { navigate("editRecord/", { state: [val[0], val[1]] }) }}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>

                                            <button className="text-danger border-0 ms-2 bg-transparent" onClick={() => handleDelete(val[0])}>
                                                <i className="bi bi-trash-fill"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Dashboard;
