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
        <div className="flex h-full flex-col items-center justify-center font-serif text-[#EDEADE]">
            <h1 className="mb-4 text-lg sm:text-3xl">
                AuthAccess User Registration
            </h1>
            <form
                className="flex flex-col rounded-2xl border border-[#b1ada1] p-4 text-center sm:min-w-lg sm:p-6 sm:text-xl"
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
                    className="m-4 rounded-lg border p-2 italic"
                    type="text"
                    placeholder="Enter your Email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />

                <input
                    className="m-4 rounded-lg border p-2 italic"
                    type="password"
                    placeholder="Enter your Password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />

                <button
                    className="m-4 mb-0 cursor-pointer rounded-lg bg-[#E5E5E5] p-1 font-mono font-bold text-black duration-150 ease-in hover:bg-zinc-300"
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
