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
        <div className="flex flex-col gap-2 text-white sm:text-lg/8 xl:text-lg/10">
            <ClipboardDetail role={role} copy={email} />
            <ClipboardDetail role={role} copy={password} />
            <button
                className="mt-2 cursor-pointer rounded-md md:rounded-lg bg-[#c15f3c] xl:px-2 text-[#f4f3ee] duration-300 ease-in hover:bg-black"
                onClick={() => {
                    !isPending && mutate({ email, password });
                    setRealTime(true);
                }}
            >
                {isPending ? <p>{role} Starting Up</p> : <p>Login {role}</p>}
            </button>
        </div>
    );
}

export default Clipboard;
