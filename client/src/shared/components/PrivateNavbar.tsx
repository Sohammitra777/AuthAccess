import PrivateUserNavbar from "./PrivateUserNavbar";
import PrivateAdminNavbar from "./PrivateAdminNavbar";
import useAuth from "../../core/auth/auth.hook";

function PrivateNavbar() {
    const { user } = useAuth();

    if (user.role === "user") return <PrivateUserNavbar />;
    if (user.role === "admin") return <PrivateAdminNavbar />;
}

export default PrivateNavbar;
