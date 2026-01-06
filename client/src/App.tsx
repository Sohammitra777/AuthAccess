import { Outlet } from "react-router-dom";
import { useContextAuth } from "./core/auth/auth.hook";
import PublicNavbar from "./shared/components/navbar/PublicNavbar";
import PrivateNavbar from "./shared/components/navbar/PrivateNavbar";
import Footer from "./shared/components/footer/Footer";

function App() {
    const { user } = useContextAuth();
    return (
        <main className="flex h-full flex-col bg-black text-white select-none">
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Outlet />
            <Footer />
        </main>
    );
}

export default App;
