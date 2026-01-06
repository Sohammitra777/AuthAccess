import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextAuth } from "../../auth.hook";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
    const { login } = useContextAuth();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: () => login(userEmail, userPassword),
        onSuccess: () => navigate("/dashboard"),
    });

    return (
        <div className="flex h-full grow flex-col items-center justify-center font-serif text-[#EDEADE]">
            <h1 className="mb-4 text-3xl">AuthAccess Login</h1>

            <form
                className="flex min-w-70 flex-col gap-4 rounded-2xl border border-[#b1ada1] p-4 text-center text-sm sm:min-w-lg sm:p-6 sm:text-xl"
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
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
                    {isPending ? "Logging in..." : "Login"}
                </button>
                {error && <p className="m-4 mb-0">Invalid Credentials</p>}
            </form>

            <p className="m-4 text-lg">
                Not Signed up yet,{" "}
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/signup")}
                >
                    SignUp
                </button>
            </p>
        </div>
    );
}

export default LoginPage;
