import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
    const [auth] = useAuth();

    return auth?.loggedIn ? <Component /> : <Navigate to='/' replace />;
};

export default PrivateRoute;