import { Link, Navigate } from "react-router-dom";
import useAuth from "../../core/auth/auth.hook";

function PrivateNavbar() {
    const { user, logout } = useAuth();

    if (!user) return <Navigate to="/login" replace />;
    return (
        <div className="mt-2 flex">
            <div className="m-2 p-4 font-serif  lg:text-xl rounded-lg w-full bg-[#c15f3c] text-[#f4f3ee] flex justify-between">
                <Link to="/">AuthAccess</Link>
                {user.role === "admin" && (
                    <>
                        <Link to="/admin">Admin Panel</Link>
                        <Link to="admin/users">Register User</Link>
                        <Link to="admin/admins">Register Admin</Link>
                    </>
                )}
                <button className="cursor-pointer" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default PrivateNavbar;
