function WelcomeAdminDashboard() {
    return (
        <div className="flex grow flex-col items-center">
            <h1 className="text-center text-xl sm:text-4xl">
                Welcome to the Admin Dashboard.
            </h1>

            <ul className="p-4 text-center text-sm/6 tracking-widest text-[#b1ada1] sm:text-xl/8">
                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl">
                        Access & Power
                    </h1>
                    <li>
                        This is where the superpowers live — the controls not
                        meant for regular users.
                    </li>
                    <li>The highest level of system control lives here.</li>
                </div>

                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl">
                        Account Visibility
                    </h1>
                    <li>
                        Administrators can view every account in the database.
                    </li>
                    <li>Full-system visibility lives in this panel.</li>
                </div>

                <div className="mb-4">
                    <h1 className="text-lg font-bold sm:text-2xl">
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
                    <h1 className="text-lg font-bold sm:text-2xl">
                        Responsibility
                    </h1>
                    <li>
                        It’s a reminder that with great permissions comes… well,
                        the responsibility not to break everything.
                    </li>
                </div>
            </ul>
        </div>
    );
}

export default WelcomeAdminDashboard;
