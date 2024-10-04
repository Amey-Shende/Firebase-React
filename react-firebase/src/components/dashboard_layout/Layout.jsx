import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Notification from '../navbar/Notification';
import { UserContext } from '../../App';
import ActiveUserPopup from '../inActivity_check/ActiveUserPopup';
import { useIdleTimer } from 'react-idle-timer';

function Layout() {
    const { handleShowPopup } = useContext(UserContext);

    //*********  custome user inactivity detection  **********/

    let inActiveTimeout;

    const handleMouseActivity = () => {
        clearTimeout(inActiveTimeout);

        inActiveTimeout = setTimeout(() => {
            // console.log("Heelo");
            handleShowPopup();
        }, 5000)      // 5 milli second after show pop confirmation
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseActivity);
        window.addEventListener('click', handleMouseActivity);
        window.addEventListener('keypress', handleMouseActivity);

        return () => {
            window.removeEventListener('mousemove', handleMouseActivity);
            window.removeEventListener('keypress', handleMouseActivity);
            window.removeEventListener('click', handleMouseActivity);
            clearTimeout(inActiveTimeout);
        };
    }, []);

    
    //*********  library code user inactivity detection  **********/
    // const handleOnIdle = () => {
    //     console.log('User is idle');
    //     handleShowPopup();
    // };

    // const handleOnActive=()=>{

    // };

    // const { getLastActiveTime } = useIdleTimer({
    //     timeout: 1000 *60 * 1 ,    // 5 minutes => 1000 * 60 * 5
    //     onIdle: handleOnIdle,
    //     // onActive: handleOnActive,
    //     // events: ['mousemove', 'keydown', 'wheel'],
    //     // crossTab: true, // Ensure that idle state is synchronized across tabs
    // });
    // mousemove , keydown ,wheel ,mousedown ,touchstart ,visibilitychange

    return (
        <div>
            <ToastContainer />
            <Notification />
            <Navbar />
            <Outlet />
            <ActiveUserPopup />
        </div>
    )
}

export default Layout;
