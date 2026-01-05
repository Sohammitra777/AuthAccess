import { useAdminToUpdate } from "../admin.mutations";

const UpdateRole = ({ id, role }: { id: string; role: string }) => {
    const nextRole = role === "user" ? "admin" : "user";
    const { mutate, isPending } = useAdminToUpdate();

    return (
        <p onClick={() => !isPending && mutate({ id, role: nextRole })}>
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
