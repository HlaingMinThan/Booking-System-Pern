import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


export const UserContextProvider = ({ children }) => {

    let [user, setUser] = useState(null)
    useEffect(() => {
        if (!user) {
            axios.get('/me').then((res) => {
                setUser(res.data);
            })
        }
    }, [])
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}