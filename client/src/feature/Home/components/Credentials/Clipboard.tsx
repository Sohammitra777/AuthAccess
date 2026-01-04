import { useMutation } from "@tanstack/react-query";
import { useContextAuth } from "../../../../core/auth/auth.hook";
import { useNavigate } from "react-router-dom";
import ClipboardDetail from "./ClipboardDetail";

function Clipboard({
    email,
    password,
    role,
}: {
    email: string;
    password: string;
    role: string;
}) {
    const { login } = useContextAuth();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: () => navigate("/dashboard"),
    });

    return (
        <div className="flex flex-col text-white">
            <ClipboardDetail role={role} copy={email} />
            <ClipboardDetail role={role} copy={password} />
            <button
                className="mt-2 cursor-pointer rounded-lg bg-[#c15f3c] p-1 pr-2 pl-2 text-[#f4f3ee] duration-150 ease-in hover:bg-black sm:mt-6"
                onClick={() => {
                    mutate();
                }}
            >
                {isPending ? <p>{role} Starting Up</p> : <p>Login {role}</p>}
            </button>
        </div>
    );
}

export default Clipboard;
