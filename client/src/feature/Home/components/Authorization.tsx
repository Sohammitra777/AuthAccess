import homeAssets from "../assets/assets";

function Authorization() {
    return (
        <main className="p-6 text-center  tracking-widest text-[#b1ada1] sm:text-xl/8 md:text-2xl/10 md:pr-30 md:pl-30">
            <h1 className="m-3 text-lg font-bold text-[rgb(244,243,238)] sm:text-3xl">
                Authorization
            </h1>
            <div className="flex items-center gap-10">
                <img
                    className="hidden h-30 w-30 lg:block"
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
