import Axios from "axios";
import { createContext, useContext, useState } from "react"


const AuthContent = createContext({
    user: null,
    setUser: () => {},
    csrfToken: () => {}
});

export const AuthProvider = ( { children } ) => {
    const [user, _setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    // set user to local storage
    const setUser = (user) => {
        
        if (user) {
            
            localStorage.setItem('user', JSON.stringify(user)); 
        } else {
            localStorage.removeItem('user')
        }
        _setUser(user);
    }

    // csrf token generation for guest methods
    const csrfToken = async() => {

        const axios = Axios.create({
            baseURL: "http://localhost:8000",
            withCredentials: true,
            credentials: "include",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        await axios.get('/sanctum/csrf-cookie');
        
        return true
    }

    return (
        <AuthContent.Provider value={ {user, setUser, csrfToken}}>
            {children}
        </AuthContent.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContent)
}