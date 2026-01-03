import { Link } from "react-router-dom";
import { useAuthRequired } from "../../core/auth/auth.hook";

const PrivateUserNavbar = () => {
  const { user, logout } = useAuthRequired();

  return (
    <div className="mt-2 flex">
      <div className="m-2 flex w-full justify-between rounded-lg bg-[#c15f3c] p-4 font-serif text-[#f4f3ee] lg:text-xl">
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
};

export default PrivateUserNavbar;
