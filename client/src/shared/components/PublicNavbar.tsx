import { Link } from "react-router-dom";

function PublicNavbar() {
    return (
        <div className="mt-2 flex">
            <div className="m-2 p-4 font-serif text-xl rounded-lg w-full bg-[#c15f3c] text-[#f4f3ee] flex justify-between">
                <Link to="/">AuthAccess</Link>
                <div className="flex gap-4">
                    <Link to="/login">Login/Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default PublicNavbar;
