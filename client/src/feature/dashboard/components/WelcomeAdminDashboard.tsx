function WelcomeAdminDashboard() {
    return (
        <div className="flex grow flex-col items-center justify-center">
            <h1 className="text-center text-xl sm:text-3xl xl:text-4xl">
                Welcome to the Admin Dashboard.
            </h1>

            <ul className="p-4 text-center text-sm/6 tracking-widest text-[#b1ada1] sm:text-lg/7 xl:text-xl/10">
                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl/10 xl:text-3xl/12">
                        Access & Power
                    </h1>
                    <li>
                        This is where the superpowers live — the controls not
                        meant for regular users.
                    </li>
                    <li>The highest level of system control lives here.</li>
                </div>

                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl/10 xl:text-3xl/12">
                        Account Visibility
                    </h1>
                    <li>
                        Administrators can view every account in the database.
                    </li>
                    <li>Full-system visibility lives in this panel.</li>
                </div>

                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl/10 xl:text-3xl/12">
                        User, Role & Data Management
                    </h1>
                    <li>
                        Create, update, and delete users, admins, and roles from
                        one place.
                    </li>
                    <li>
                        Full CRUD control extends to emails and key system data.
                    </li>
                    <li>
                        This panel is the central command hub for managing
                        accounts and permissions.
                    </li>
                </div>

                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl/10 xl:text-3xl/12">
                        Responsibility
                    </h1>
                    <li>
                        It’s a perfect reminder that with great permissions
                        comes… well, the responsibility not to break everything.
                    </li>
                </div>
            </ul>
        </div>
    );
}

export default WelcomeAdminDashboard;
