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
        <div className="flex flex-col p-2 text-white sm:text-lg/8 lg:text-xl/10">
            <ClipboardDetail role={role} copy={email} />
            <ClipboardDetail role={role} copy={password} />
            <button
                className="mt-2 cursor-pointer rounded-lg bg-[#c15f3c] p-1 pr-2 pl-2 text-[#f4f3ee] duration-150 ease-in hover:bg-black"
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
