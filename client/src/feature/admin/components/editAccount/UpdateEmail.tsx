import { useState } from "react";
import { useAccountUpdate } from "../../admin.mutations";

const UpdateEmail = ({ id }: { id: string }) => {
    const [email, setEmail] = useState("");

    const { mutate, isPending, error } = useAccountUpdate();
    return (
        <div>
            <form
                className="flex flex-col items-center gap-4 sm:flex-row"
                onSubmit={(e) => {
                    e.preventDefault();
                    !isPending && mutate({ id, email });
                    setEmail("");
                }}
            >
                <label className="text-center text-lg lg:text-sm">Update Email </label>
                <input
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-200 placeholder-neutral-500 transition-all outline-none focus:border-[#C96A45] focus:ring-2 focus:ring-[#C96A45]/50"
                    value={email}
                    placeholder="Enter email"
                    inputMode="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="cursor-pointer rounded-lg bg-[#C96A45] text-sm px-4 py-2 sm:font-medium text-black transition-colors duration-200 hover:bg-[#D97C56]">
                    {isPending ? "Updating":"Update"}
                </button>
            </form>
            <p>{error && "Invalid Email Fromat"}</p>
        </div>
    );
};

export default UpdateEmail;
