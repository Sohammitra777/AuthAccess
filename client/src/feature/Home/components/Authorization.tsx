import homeAssets from "../assets/assets";

function Authorization() {
    return (
        <main className="md:pr-30 md:pl-30 p-6 rounded-xl text-[#b1ada1] text-center text-sm sm:text-2xl/10 tracking-widest">
            <h1 className="m-3 text-[#f4f3ee] text-lg sm:text-3xl font-bold">Authorization</h1>
            <div className="flex items-center gap-10">
                <img
                    className="w-30 h-30 hidden md:block"
                    src={homeAssets.icon.authorization}
                    alt="authorization image"
                />
                <p>
                    Different users unlock different access. The Admin Panel is
                    available only for admin accounts, demonstrating role-based
                    permissions, protected routes, and controlled UI visibility.
                </p>
            </div>
        </main>
    );
}

export default Authorization;
