import { Navigate, Outlet } from "react-router-dom";

const RedirectRoute = ({ isLogged }) => {

    return (
        !isLogged ? <Outlet /> : <Navigate to={'/home'} replace />
    );
};

export default RedirectRoute;