import { Link } from "react-router-dom";
import { useAuthRequired } from "../../core/auth/auth.hook";
import { useState } from "react";
import sharedAssets from "../assets/assets";

const PrivateAdminNavbar = () => {
    const [adminPanel, setAdminPanel] = useState(true);
    const { logout } = useAuthRequired();

    return (
        <div className="flex font-serif lg:text-xl">
            <div className="m-2 flex w-full justify-between rounded-lg bg-[#c15f3c] p-4 text-[#f4f3ee]">
                <Link to="/">AuthAccess</Link>
                <img
                    className="h-7 w-7"
                    src={sharedAssets.icons.hamburger}
                    alt="hamburger icon"
                />
            </div>
            {adminPanel && (
                <div
                    onClick={() => setAdminPanel(false)}
                    className="fixed h-full w-full"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-20 right-2 bottom-3 flex h-auto min-w-40 flex-col rounded-2xl bg-[#c15f3c] p-2"
                    >
                        <Link to="/admin">Admin Panel</Link>
                        <Link to="/admin/users">Create User</Link>
                        <Link to="/admin/admins">Create Admin</Link>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivateAdminNavbar;
