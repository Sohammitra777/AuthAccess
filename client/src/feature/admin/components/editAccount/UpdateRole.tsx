import { useAccountUpdate } from "../../admin.mutations";

const UpdateRole = ({ id, role }: { id: string; role: string }) => {
    const nextRole = role === "user" ? "admin" : "user";
    const { mutate, isPending } = useAccountUpdate();

    return (
        <button
            className="cursor-pointer rounded-lg bg-neutral-800  px-4 py-2 text-sm lg:text-md tracking-wide text-[#E5E5E5] hover:font-medium  hover:tracking-widest duration-400"
            onClick={() => !isPending && mutate({ id, role: nextRole })}
        >
            {isPending
                ? role === "user"
                    ? "Upgrading to Admin"
                    : "Downgrading to User"
                : role === "user"
                  ? "Upgrade to Admin"
                  : "Downgrade to User"}
        </button>
    );
};

export default UpdateRole;
