import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";

function SessionExpire() {

    const navigate = useNavigate();
    const { autoLogout, setAutoLogout } = useContext(UserContext);

    const handleLoginAgain = () => {
        setAutoLogout(false)
        navigate("/login", { replace: true });
    }

    return (
        <>
            {
                autoLogout &&

                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: "2000" }}>

                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center">
                            <div className="modal-header justify-content-center border-0">
                                <h5 className="modal-title">Session ended</h5>
                            </div>

                            <div className="modal-body">
                                <p>Due to inactivity, we've ended your session.
                                </p>
                            </div>

                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-danger mx-2" onClick={handleLoginAgain}>Log back in</button>
                            </div>
                        </div>
                    </div>
                </ div>
            }
        </>
    );

};


export default SessionExpire;
