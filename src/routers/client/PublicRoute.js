import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const PublicRoute = ({ component: Component }) => {
    const [auth] = useAuth();

    return auth?.loggedIn ? <Navigate to='/dashboard' replace /> : <Component />;
};

export default PublicRoute;