import { onMessage } from 'firebase/messaging';
import React, { useEffect } from 'react'
import { messaging } from '../firebase/FIrebase';
import { toast } from 'react-toastify';

function Notification() {
    const titleStyle = {
        fontWeight: "bold",
        marginBottom: "5px",
    };

    const bodyStyle = {
        margin: "0",
    };

    const showToast = (title, body, image) => {
        if (title && body) {

            toast(
                <div >
                    <div >
                        <div style={titleStyle}>{title}</div>
                        <p style={bodyStyle}>{body}</p>
                    </div>
                    <img src={image} alt="imageIcon" width="50" height="50" />
                </div>,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { backgroundColor: "#f8f9fa" }
                }
            );
        }
    };
    useEffect(() => {

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("foreground message: ", payload);
            const title = payload.notification?.title;
            const body = payload.notification?.body;
            const image = payload.notification?.image;
            showToast(title, body, image);
        });
        return () => unsubscribe();
    }, []) 

    return (
        <div>

        </div>
    )
}

export default Notification
