import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDeleteMutation } from "../../../shared.mutations";
import useAuth from "../../../../core/auth/auth.hook";
import assets from "../../../../assets/assets";

const PrivateAdminNavbar = () => {
    const [adminPanel, setAdminPanel] = useState(false);
    const { user, logout } = useAuth();
    const { mutate } = useDeleteMutation();

    return (
        <div className="m-2 mb-0 flex font-serif lg:text-xl">
            <div className="m-2 flex w-full items-center justify-between rounded-lg bg-[#c15f3c] p-2 text-[#f4f3ee] sm:pr-4 sm:pl-4">
                <Link to="/" className="tracking-wide">
                    AuthAccess
                </Link>

                <img
                    className="h-4 w-4 cursor-pointer transition hover:opacity-80 active:scale-95 sm:h-5 sm:w-5"
                    onClick={() => setAdminPanel(true)}
                    src={assets.icons.hamburgerIcon}
                    alt="Open admin panel"
                />
            </div>

            {adminPanel && (
                <div
                    onClick={() => setAdminPanel(false)}
                    className="fixed inset-0 cursor-pointer bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 sm:text-xl"
                >
                    <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-18 right-3 bottom-3 flex min-w-40 cursor-default flex-col gap-3 rounded-2xl border border-white/25 bg-[#c15f3c] p-4 text-lg shadow-2xl shadow-black/40 sm:min-w-50"
                    >
                        <h3 className="mb-1 font-semibold tracking-wide">
                            Admin Menu
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="hover:opacity-80"
                                to="/admin"
                            >
                                Admin Panel
                            </Link>
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="hover:opacity-80"
                                to="/admin/users"
                            >
                                Create User
                            </Link>
                            <Link
                                onClick={() => setAdminPanel(false)}
                                className="hover:opacity-80"
                                to="/admin/admins"
                            >
                                Create Admin
                            </Link>
                        </div>

                        <p
                            onClick={logout}
                            className="nav-btn-danger mt-auto cursor-pointer hover:opacity-80"
                        >
                            Logout
                        </p>
                        <p
                            className="cursor-pointer hover:opacity-80"
                            onClick={() => {
                                mutate(user.id);
                                logout();
                            }}
                        >
                            Delete Account
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PrivateAdminNavbar;
