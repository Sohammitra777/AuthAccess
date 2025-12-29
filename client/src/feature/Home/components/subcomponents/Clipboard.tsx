import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../../core/auth/auth.hook";
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
    const { login } = useAuth();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: () => navigate("/dashboard"),
    });

    return (
        <div className=" text-white flex flex-col">
            <ClipboardDetail role={role} copy={email} />
            <ClipboardDetail role={role} copy={password} />
            <button
                className="mt-6 p-1 pl-2 pr-2 rounded-lg bg-[#c15f3c] 
                        hover:bg-black text-[#f4f3ee] cursor-pointer duration-150 ease-in"
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
