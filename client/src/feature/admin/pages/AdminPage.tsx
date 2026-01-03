import { useAuthRequired } from "../../../core/auth/auth.hook";
import adminAssets from "../assets/assets";
import { useAdminDeleteUser } from "../admin.mutations";
import { useAdminFetchUserData } from "../admin.queries";
import EmptyList from "../components/EmptyList";

function AdminPage() {
    const { user } = useAuthRequired();
    const { data, isPending } = useAdminFetchUserData();
    const { mutate } = useAdminDeleteUser();

    if (isPending) return <p>Loading Users</p>;
    if (!data || data.length === 1) return <EmptyList />;
    return (
        <ul>
            {data.map(
                (u) =>
                    u.email !== user.email && (
                        <li
                            key={u.id}
                            className="m-2 flex cursor-pointer justify-between gap-4 rounded-lg p-4 text-[#f4f3ee] duration-75 ease-in-out hover:border"
                        >
                            <div className="flex gap-2">
                                <p>{u.email}</p>
                                {u.role === "admin" && <p>Admin</p>}
                            </div>
                            <img
                                onClick={() => mutate(u.id)}
                                className="h-5 w-5 duration-150 hover:h-7 hover:w-7"
                                src={adminAssets.icon.deleteIcon}
                                alt="delete Icon"
                            />
                        </li>
                    ),
            )}
        </ul>
    );
}

export default AdminPage;
