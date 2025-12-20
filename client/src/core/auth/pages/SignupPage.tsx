import React, { useState } from "react";
import authServices from "../../../services/auth.services";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await authServices.signup(userEmail, userPassword);
            navigate("/login");
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
                <button type="submit">Signpup</button>
                {error !== "" && <p>Error</p>}

            </form>
        </div>
    );
}

export default SignupPage;
