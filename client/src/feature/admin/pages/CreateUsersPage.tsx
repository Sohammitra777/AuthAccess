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
        <div className="flex h-full grow flex-col items-center justify-center font-serif text-[#EDEADE]">
            <h1 className="mb-4 text-xl sm:text-3xl">
                AuthAccess User Creation
            </h1>
            <form
                className="flex min-w-70 flex-col gap-4 rounded-2xl border border-[#b1ada1] p-4 text-center text-sm sm:min-w-lg sm:p-4 sm:text-lg"
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
                    className="rounded-lg border p-1 pl-2 italic sm:m-2 sm:p-2"
                    type="text"
                    placeholder="Enter your Email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />

                <input
                    className="rounded-lg border p-1 pl-2 italic sm:m-2 sm:p-2"
                    type="password"
                    placeholder="Enter your Password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />

                <button
                    className="mb-0 cursor-pointer rounded-lg bg-[#E5E5E5] p-1 font-mono font-bold text-black duration-150 ease-in hover:bg-zinc-300 sm:m-4"
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
                Want to Create Admin?,
                <Link className="pl-2" to="/admin/admins">
                    Create Admin
                </Link>
            </p>
        </div>
    );
}

export default CreateUserPage;
