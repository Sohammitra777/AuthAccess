import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth.hook";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [password, setPassword] = useState(true);

    const { mutate, isPending, error } = useMutation({
        mutationFn: () => login(userEmail, userPassword),
        onSuccess: () => navigate("/dashboard"),
    });

    return (
        <div className="flex justify-center items-center">
            <form
                className="p-4 flex flex-col bg-[#2E4F4F] gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
                }}
            >
                <input
                    className="border"
                    type="text"
                    placeholder="email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />

                <div className="flex gap-5">
                    <input
                        className="border"
                        type={password?"password":"text"}
                        placeholder="password"
                        value={userPassword}
                        onChange={(event) =>
                            setUserPassword(event.target.value)
                        }
                    />
                    <p onClick={() => setPassword(!password)}>I</p>
                </div>

                <button className="border hover:cursor-pointer" type="submit">
                    {isPending ? "Logging in..." : "Login"}
                </button>
                {error && <p>Error</p>}
            </form>
        </div>
    );
}

export default LoginPage;
