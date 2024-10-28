import {jwtDecode} from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");  // Original role from token
  const [role2, setRole2] = useState(""); // Secondary role for temporary changes

  const getUserData = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token Role:", decodedToken.role);
        setRole(decodedToken.role); // Store the original role
        setRole2(decodedToken.role); // Initialize role2 with the original role

       

      } catch (error) {
        console.error("Invalid token:", error);
        setRole("");
        setRole2(""); // Clear role2 if the token is invalid
      }
    } else {
      console.log("No token found");
      setRole("");
      setRole2("");
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{ role, role2, setRole2, setRole, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
