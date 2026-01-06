import Authentication from "../components/Authentication";
import Authorization from "../components/Authorization";
import Credentials from "../components/Credentials";
import Welcome from "../components/Welcome";

function HomePage() {
    return (
        <section className="flex flex-col font-mono text-[#f4f3ee]">
            <Welcome />
            <Authentication />
            <Authorization />
            <Credentials />
        </section>
    );
}

export default HomePage;
