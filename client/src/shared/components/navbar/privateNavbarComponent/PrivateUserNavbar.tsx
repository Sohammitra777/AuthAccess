import { Link } from "react-router-dom";
import useAuth from "../../../../core/auth/auth.hook";
import { useDeleteMutation } from "../../../shared.mutations";

const PrivateUserNavbar = () => {
    const { user, logout } = useAuth();
    const { mutate } = useDeleteMutation();

    return (
        <div className="mt-2 flex">
            <div className="m-2 flex w-full justify-between rounded-lg bg-[#c15f3c] p-4 font-serif text-[#f4f3ee] lg:text-lg">
                <Link className="text-2xl" to="/">
                    AuthAccess
                </Link>
                <div className="flex gap-4">
                    <button
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => {
                            mutate(user.id);
                            logout();
                        }}
                    >
                        Delete Account
                    </button>
                    <button
                        className="cursor-pointer hover:opacity-80"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivateUserNavbar;
