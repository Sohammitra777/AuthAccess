import React, { useState } from "react";

function LoginPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); 



        
    }

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
                type="text"
                placeholder="password"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
            />
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
