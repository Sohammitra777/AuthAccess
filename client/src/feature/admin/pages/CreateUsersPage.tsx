import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import adminServices, {
    type User,
} from "../../../core/services/admin.services";

function CreateUserPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (user: Omit<User, "id">) =>
            adminServices.createNewAdminOrUser(user),
    });

    return (
        <div className="font-serif h-full text-[#EDEADE] flex flex-col justify-center items-center">
            <h1 className="mb-4 text-lg sm:text-3xl">
                AuthAccess User Registration
            </h1>
            <form
                className="sm:min-w-lg p-4 sm:p-6 rounded-2xl sm:text-xl border border-[#b1ada1] text-center flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    const user = {
                        email: userEmail,
                        password: userPassword,
                        role: "user",
                    };
                    mutate(user);
                }}
            >
                <input
                    className="m-4 p-2 italic border rounded-lg"
                    type="text"
                    placeholder="Enter your Email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />

                <input
                    className="m-4 p-2 italic border rounded-lg"
                    type="password"
                    placeholder="Enter your Password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />

                <button
                    className="mb-0 m-4 p-1 font-mono font-bold bg-[#E5E5E5] hover:bg-zinc-300 
                    text-black rounded-lg cursor-pointer duration-150 ease-in"
                    type="submit"
                >
                    {isPending ? "Getting Registered" : "Register"}
                </button>
                {isSuccess && (
                    <p className="m-2 p-2">User registered successfully</p>
                )}
                {isError && <p className="m-2 p-2">User Already Registered</p>}
            </form>
            <p className="m-2 p-2">
                Want to Register Admin?,
                <Link to="/admin/admins">Register Admin</Link>
            </p>
        </div>
    );
}

export default CreateUserPage;
