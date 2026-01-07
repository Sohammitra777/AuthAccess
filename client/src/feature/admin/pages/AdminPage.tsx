import useAuth from "../../../core/auth/auth.hook";
import { useAdminFetchUserData } from "../admin.queries";
import EmptyList from "../components/EmptyList";
import LoadingPage from "../../../shared/page/LoadingPage";
import EditAccount from "../components/EditAccount";

function AdminPage() {
    const { user } = useAuth();
    const { data, isPending } = useAdminFetchUserData();

    if (isPending) return <LoadingPage />;
    if (!data || data.length === 1) return <EmptyList />;
    return (
        <ul className="grow">
            {data.map(
                (u) =>
                    u.email !== user.email && (
                        <EditAccount
                            key={u.id}
                            id={u.id}
                            email={u.email}
                            role={u.role}
                        />
                    ),
            )}
        </ul>
    );
}

export default AdminPage;
