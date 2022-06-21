import { createContext, useContext, useState } from 'react';

const initState = {
    loggedIn: true
};

const authContext = createContext({});

export const useAuth = () => {
    return useContext(authContext);
};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initState);

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;