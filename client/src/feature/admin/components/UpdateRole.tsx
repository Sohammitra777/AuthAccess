import { useAdminToUpdate } from "../admin.mutations";

const UpdateRole = ({ id, role }: { id: string; role: string }) => {
    const nextRole = role === "user" ? "admin" : "user";
    const { mutate, isPending } = useAdminToUpdate();

    return (
        <p
            className="duration-300 hover:opacity-80"
            onClick={() => !isPending && mutate({ id, role: nextRole })}
        >
            {isPending
                ? role === "user"
                    ? "Upgrading to Admin"
                    : "Downgrading to User"
                : role === "user"
                  ? "Upgrade to Admin"
                  : "Downgrade to User"}
        </p>
    );
};

export default UpdateRole;
