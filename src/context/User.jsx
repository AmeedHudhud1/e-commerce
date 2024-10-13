import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [role, setRole] = useState(" ")

   const getUserData = () =>{
        if(token!=null){
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken.role);
            setRole(decodedToken.role);
        }else{
            console.log('not token')
        }
    }

    useEffect(()=>{
        getUserData()
    },[token])

    return <UserContext.Provider value={{role,token}}>
        {children }
    </UserContext.Provider>
}

export default UserContextProvider