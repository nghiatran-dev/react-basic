import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    });

    const [isAppLoading, setIsAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    );
};

AuthWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};