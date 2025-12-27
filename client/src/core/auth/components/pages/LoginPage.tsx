import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth.hook";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const { mutate, isPending, error } = useMutation({
        mutationFn: () => login(userEmail, userPassword),
        onSuccess: () => navigate("/dashboard"),
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
                }}
            >
                <input
                    type="text"
                    placeholder="email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="text"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />
                <button type="submit">
                    {isPending ? "Logging in..." : "Login"}
                </button>
                {error && <p>Error</p>}
            </form>
        </div>
    );
}

export default LoginPage;
