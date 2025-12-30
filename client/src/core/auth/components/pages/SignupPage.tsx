import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../auth.services";
import { useMutation } from "@tanstack/react-query";

function SignupPage() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: async () => authServices.signup(userEmail, userPassword),
        onSuccess: () => {
            navigate("/login");
        },
    });

    return (
        <div className="font-serif h-full text-[#EDEADE] flex flex-col justify-center items-center">
            <h1 className="mb-4 text-3xl">AuthAccess SignUp</h1>
            <form
                className="min-w-lg p-6 rounded-2xl text-xl border border-[#b1ada1] text-center flex flex-col"
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
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
                    {isPending ? "Signing in..." : "Sign-Up"}
                </button>
                {error && <p className="m-4 mb-0">Signup Failed</p>}
            </form>
            <p className="m-4 text-lg">
                Looking for login,{" "}
                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </p>
        </div>
    );
}

export default SignupPage;
