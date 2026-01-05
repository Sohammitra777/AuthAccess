import useAuth from "../../../core/auth/auth.hook";
import PrivateAdminNavbar from "./privateNavbarComponent/PrivateAdminNavbar";
import PrivateUserNavbar from "./privateNavbarComponent/PrivateUserNavbar";

function PrivateNavbar() {
    const { user } = useAuth();

    if (user.role === "user") return <PrivateUserNavbar />;
    if (user.role === "admin") return <PrivateAdminNavbar />;
}

export default PrivateNavbar;
