import { Outlet } from "react-router-dom";
import { useContextAuth } from "./core/auth/auth.hook";
import PublicNavbar from "./shared/components/PublicNavbar";
import PrivateNavbar from "./shared/components/PrivateNavbar";

function App() {
    const { user } = useContextAuth();
    return (
        <main className="flex h-full flex-col bg-black text-white select-none">
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Outlet />
        </main>
    );
}

export default App;
