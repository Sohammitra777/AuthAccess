import Authentication from "../components/Authentication";
import Authorization from "../components/Authorization";
import Credentials from "../components/Credentials";
import Welcome from "../components/Welcome";

function HomePage() {
    return (
        <section className="font-mono text-[#f4f3ee] flex flex-col gap-5">
            <Welcome />
            <Authentication />
            <Authorization />
            <Credentials />
        </section>
    );
}

export default HomePage;
