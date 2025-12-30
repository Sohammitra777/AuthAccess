import { Outlet } from "react-router-dom";
import useAuth from "./core/auth/auth.hook";
import PublicNavbar from "./shared/components/PublicNavbar";
import PrivateNavbar from "./shared/components/PrivateNavbar";

function App() {
    const { user } = useAuth();
    return (
        <main className="h-full bg-black text-white flex flex-col select-none">
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Outlet />
        </main>
    );
}

export default App;
