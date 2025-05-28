import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    return user ? children : <Navigate to={'/login'} />
};

export default PrivateRoute;