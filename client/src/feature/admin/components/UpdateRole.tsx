import { useState } from "react";
import { useAdminToUpdate } from "../admin.mutations";

const UpdateRole = ({ id, role }: { id: string; role: string }) => {
    const nextRole = role === "user" ? "admin" : "user";
    const [onElement, setOnElement] = useState(false);
    const label = role.charAt(0).toUpperCase() + role.slice(1);
    const { mutate, isPending } = useAdminToUpdate();

    return (
        <p
            onMouseEnter={() => setOnElement(true)}
            onMouseLeave={() => setOnElement(false)}
            onClick={() => !isPending && mutate({ id, role: nextRole })}
        >
            {onElement
                ? role === "user"
                    ? "Upgrade to Admin"
                    : "Downgrade to User"
                : isPending
                  ? role === "user"
                      ? "Upgrading to Admin"
                      : "Downgrading to User"
                  : label}
        </p>
    );
};

export default UpdateRole;
