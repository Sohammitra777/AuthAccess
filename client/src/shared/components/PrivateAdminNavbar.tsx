import { Link } from "react-router-dom";
import { useState } from "react";
import sharedAssets from "../assets/assets";
import useAuth from "../../core/auth/auth.hook";
import { useDeleteMutation } from "../shared.mutations";

const PrivateAdminNavbar = () => {
    const [adminPanel, setAdminPanel] = useState(false);
    const { user, logout } = useAuth();
    const { mutate } = useDeleteMutation();

    return (
        <div className="flex font-serif lg:text-xl">
            <div className="m-2 flex w-full justify-between rounded-lg bg-[#c15f3c] p-4 text-[#f4f3ee]">
                <Link to="/" className="font-semibold tracking-wide">
                    AuthAccess
                </Link>

                <img
                    className="h-7 w-7 cursor-pointer transition hover:opacity-80 active:scale-95"
                    onClick={() => setAdminPanel(true)}
                    src={sharedAssets.icons.hamburger}
                    alt="Open admin panel"
                />
            </div>

            {adminPanel && (
                <div
                    onClick={() => setAdminPanel(false)}
                    className="fixed inset-0 cursor-pointer bg-black/40 backdrop-blur-[1px] transition-opacity duration-200"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-slide-in fixed top-20 right-3 bottom-3 flex min-w-56 cursor-default flex-col gap-3 rounded-3xl border border-white/25 bg-[#c15f3c] p-4 shadow-2xl shadow-black/40"
                    >
                        <h3 className="mb-1 text-lg font-semibold tracking-wide">
                            Admin Menu
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="nav-btn"
                                to="/admin"
                            >
                                Admin Panel
                            </Link>
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="nav-btn"
                                to="/admin/users"
                            >
                                Create User
                            </Link>
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="nav-btn"
                                to="/admin/admins"
                            >
                                Create Admin
                            </Link>
                        </div>

                        <p
                            onClick={logout}
                            className="nav-btn-danger mt-auto cursor-pointer"
                        >
                            Logout
                        </p>
                        <p
                            className="cursor-pointer"
                            onClick={() => {
                                mutate(user.id);
                                logout();
                            }}
                        >
                            Delete Account
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrivateAdminNavbar;
