import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../auth.services";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
        <div className="flex h-full grow flex-col items-center justify-center font-serif text-[#EDEADE]">
            <h1 className="mb-4 text-3xl">AuthAccess SignUp</h1>
            <form
                className="flex min-w-70 flex-col gap-2 rounded-2xl border border-[#b1ada1] p-4 text-center text-sm sm:min-w-lg sm:text-lg"
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
                    required
                />
                <input
                    className="rounded-lg border p-1 pl-2 italic sm:m-2 sm:p-2"
                    type="password"
                    placeholder="Enter your Password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                    required
                />
                <button
                    className="mb-0 cursor-pointer rounded-lg bg-[#E5E5E5] p-1 font-mono font-bold tracking-widest text-black duration-150 ease-in hover:bg-zinc-300 sm:m-4"
                    type="submit"
                >
                    {isPending ? "Signing in..." : "Sign-Up"}
                </button>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="-m-2"
                    >
                        Signup Failed
                    </motion.p>
                )}
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
