import { Navigate } from "react-router-dom";
import { useAuthRequired } from "../../core/auth/auth.hook";
import PrivateUserNavbar from "./PrivateUserNavbar";
import PrivateAdminNavbar from "./PrivateAdminNavbar";

function PrivateNavbar() {
    const { user } = useAuthRequired();

    if (user.role !== "admin" && user.role !== "user")
        return <Navigate to="/login" replace />;
    if (user.role === "user") return <PrivateUserNavbar />;
    if (user.role === "admin") return <PrivateAdminNavbar />;
}

export default PrivateNavbar;
