import ClipboardDetail from "./ClipboardDetail";
import { useCredentialLoginMutation } from "./credential.mutation";

function Clipboard({
    email,
    password,
    role,
    setRealTime,
}: {
    email: string;
    password: string;
    role: string;
    setRealTime: Function;
}) {
    const { mutate, isPending } = useCredentialLoginMutation();
    return (
        <div className="flex flex-col text-white">
            <ClipboardDetail role={role} copy={email} />
            <ClipboardDetail role={role} copy={password} />
            <button
                className="mt-2 cursor-pointer rounded-lg bg-[#c15f3c] p-1 pr-2 pl-2 text-[#f4f3ee] duration-150 ease-in hover:bg-black sm:mt-6"
                onClick={() => {
                    !isPending && mutate({ email, password });
                    setTimeout(() => {
                        setRealTime(true);
                    }, 5 * 1000);
                }}
            >
                {isPending ? <p>{role} Starting Up</p> : <p>Login {role}</p>}
            </button>
        </div>
    );
}

export default Clipboard;
