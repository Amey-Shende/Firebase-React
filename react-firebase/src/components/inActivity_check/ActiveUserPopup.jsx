import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FIrebase';

function ActiveUserPopup() {

    const navigate = useNavigate();
    const { showPopup, handleShowPopup, setAutoLogout, setShowPopup } = useContext(UserContext);

    const [timer, setTimer] = useState(15)

    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            sessionStorage.clear();
            setAutoLogout(false)
            setShowPopup(false);
            navigate("/login", { replace: true });

        }).catch((error) => {
            console.error("Error during logout:", error);
        });
    };

    useEffect(() => {
        let timeoutId;

        if (showPopup && timer > 0) {
            timeoutId = setTimeout(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            signOut(auth).then(() => {
                localStorage.clear();
                sessionStorage.clear();
                handleShowPopup();
                setAutoLogout(true);
                navigate("/login", { replace: true });

            }).catch((error) => {
                console.error("Error during logout:", error);
            });
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showPopup, timer, navigate, setAutoLogout, handleShowPopup]);


    const handleStil = () => {
        handleShowPopup()
        setTimer(15);
    };

    return (
        <>
            {
                showPopup &&

                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: "2000" }}>

                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center">
                            <div className="modal-header justify-content-center border-0">
                                <h5 className="modal-title">Are you still there?</h5>
                            </div>

                            <div className="modal-body">
                                <p>If not, we'll close the session in: <strong>
                                    00:{timer}
                                    {console.log(timer)}
                                </strong></p>
                            </div>

                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>

                                <button type="button" className="btn bg-transparent" data-dismiss="modal" onClick={handleStil}>
                                    I am still here
                                </button>
                            </div>
                        </div>
                    </div>
                </ div>
            }
        </>
    );

};


export default ActiveUserPopup;
