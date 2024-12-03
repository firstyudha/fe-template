import { cilDoor } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CForm } from "@coreui/react";
import { useNavigate } from "react-router-dom";



export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        sessionStorage.removeItem("auth");

        setTimeout(() => {
            navigate('/login');
        }, 0)
    }

    return (
        <CForm className="header" onSubmit={handleLogout}>
            <CIcon icon={cilDoor} className="me-2" />
            <CButton type='submit' className="logout-button">Logout</CButton>
        </CForm>
    );
}