import useAuth from "../../../core/auth/auth.hook";
import adminAssets from "../assets/assets";
import { useAdminDeleteUser } from "../admin.mutations";
import { useAdminFetchUserData } from "../admin.queries";
import EmptyList from "../components/EmptyList";
import UpdateRole from "../components/UpdateRole";
import LoadingPage from "../../../shared/page/LoadingPage";

function AdminPage() {
    const { user } = useAuth();
    const { data, isPending } = useAdminFetchUserData();
    const { mutate } = useAdminDeleteUser();

    if (isPending) return <LoadingPage />;
    if (!data || data.length === 1) return <EmptyList />;
    return (
        <ul className="grow">
            {data.map(
                (u) =>
                    u.email !== user.email && (
                        <li
                            key={u.id}
                            className="m-2 flex cursor-pointer flex-col gap-4 rounded-lg p-4 text-[#f4f3ee] duration-75 ease-in-out hover:border sm:flex-row sm:justify-between"
                        >
                            <div className="flex gap-2 font-bold">
                                <p>{u.email}</p>
                                {u.role === "admin" && <p>Admin</p>}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <UpdateRole id={u.id} role={u.role} />
                                <img
                                    onClick={() => {
                                        mutate(u.id);
                                    }}
                                    className="h-5 w-5 duration-150 hover:h-7 hover:w-7"
                                    src={adminAssets.icon.deleteIcon}
                                    alt="delete Icon"
                                />
                            </div>
                        </li>
                    ),
            )}
        </ul>
    );
}

export default AdminPage;
