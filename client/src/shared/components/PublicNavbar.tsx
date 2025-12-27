import { Link } from "react-router-dom";

function PublicNavbar() {
    return (
        <div className="flex justify-center items-center">
            <div className="m-2 p-4 rounded-lg w-full bg-black flex justify-evenly">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default PublicNavbar;
