import { useContext, createContext, useState, useEffect } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set the user from localStorage
        }
    }, []);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(userContext);
};