import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const accessToken = sessionStorage.getItem("auth")
    console.log("access token", accessToken)

    if ((accessToken == undefined)) {
        return <Navigate to="/login" />
    }
 
    return (
        <div>
                {children}
        </div>
    )   
}