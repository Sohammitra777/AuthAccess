import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../auth.services";
import { useMutation } from "@tanstack/react-query";

function SignupPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: async () => authServices.signup(userEmail, userPassword),
        onSuccess: () => {
            navigate("/login");
        },
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
                    type="password"
                    placeholder="password"
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                />
                <button type="submit">{isPending?"Signing in...":"Sign-Up"}</button>
                {error && <p>Error</p>}
            </form>
        </div>
    );
}

export default SignupPage;
