import { createContext, useContext, useState } from 'react';

const initState = {
    loggedIn: false
};

const authContext = createContext(initState);

export const useAuth = () => {
    return useContext(authContext);
};

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState();

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;