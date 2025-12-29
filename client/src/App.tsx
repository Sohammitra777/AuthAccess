import { Outlet } from "react-router-dom";
import useAuth from "./core/auth/auth.hook";
import PublicNavbar from "./shared/components/PublicNavbar";

function App() {
    const { user } = useAuth();
    return (
        <main className="h-full bg-black text-white flex flex-col">
            {user ? <p>Authenticated</p> : <PublicNavbar />}
            <Outlet />
        </main>
    );
}

export default App;
