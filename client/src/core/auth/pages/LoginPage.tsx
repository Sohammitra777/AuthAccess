import React, { useState } from "react";
import authServices from "../../../services/auth.services";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function LoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await authServices.login(userEmail, userPassword);
            login(result.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="email"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />
                <button type="submit">Login</button>
                {error !== "" && <p>Error</p>}

            </form>
        </div>
    );
}

export default LoginPage;
