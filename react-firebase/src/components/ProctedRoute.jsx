import { Navigate } from 'react-router-dom';

function ProctedRoute({ Comp }) {

    const token = sessionStorage.getItem("authToken");

    if (token) {
        return <Comp></Comp>
    } else {
        return <Navigate to="/login" />
    }

}

export default ProctedRoute;
