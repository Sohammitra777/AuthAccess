import homeAssets from "../assets/assets";

function Authorization() {
    return (
        <main className="m-2 p-2 text-center">
            <h1 className="mt-4 mb-2 text-lg font-bold tracking-widest text-[#f4f3ee] sm:text-2xl md:text-2xl">
                Authorization
            </h1>
            <div className="flex items-center gap-10">
                <img
                    className="hidden h-20 w-20 lg:block"
                    src={homeAssets.icon.authorization}
                    alt="authorization image"
                />
                <p className="text-sm/6 text-[#b1ada1] sm:text-lg/8 lg:text-lg/10">
                    Different users unlock different access. The Admin Panel is
                    available only for admin accounts, demonstrating role-based
                    permissions, protected routes, and controlled UI visibility.
                </p>
            </div>
        </main>
    );
}

export default Authorization;
