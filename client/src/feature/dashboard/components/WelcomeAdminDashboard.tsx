function WelcomeAdminDashboard() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-xl sm:text-4xl">
        Welcome to the Admin Dashboard.
      </h1>

      <ul className="p-4 text-center text-sm/6 tracking-widest text-[#b1ada1] sm:text-xl/8">
        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">Access & Power</h1>
          <li>This is where the superpowers live — the controls not meant for regular users.</li>
          <li>The highest level of system control lives here.</li>
        </div>

        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">Account Visibility</h1>
          <li>Administrators can view every account in the database.</li>
          <li>Full-system visibility lives in this panel.</li>
        </div>

        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">Email & Data Actions</h1>
          <li>Create, update, and delete emails from one place.</li>
          <li>This panel is the command center for changes.</li>
        </div>

        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">User Roles & Control</h1>
          <li>Role switching and user management happen here.</li>
          <li>The Admin Panel puts the real control tools on display.</li>
        </div>

        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-bold">Responsibility</h1>
          <li>
            It’s a reminder that with great permissions comes… well, the responsibility not to break everything.
          </li>
        </div>
      </ul>
    </div>
  );
}

export default WelcomeAdminDashboard;
