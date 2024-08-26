import React,{ createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userEMail,setUserEMail] = useState(localStorage.getItem("user-email"));

    return(
        <UserContext.Provider value={{userEMail,setUserEMail}}>
            {children}
        </UserContext.Provider>
    )
};