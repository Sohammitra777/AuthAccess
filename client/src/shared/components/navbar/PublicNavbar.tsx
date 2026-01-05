import { Link } from "react-router-dom";

function PublicNavbar() {
    return (
        <div className="mt-2 flex">
            <div className="m-2 flex w-full justify-between rounded-lg bg-[#c15f3c] p-4 font-serif text-xl text-[#f4f3ee]">
                <Link to="/">AuthAccess</Link>
                <div className="flex gap-4">
                    <Link to="/login">Login/Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default PublicNavbar;
