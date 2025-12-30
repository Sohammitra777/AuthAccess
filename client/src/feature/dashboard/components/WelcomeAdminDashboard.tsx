function WelcomeAdminDashboard() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">Welcome to the Admin Dashboard.</h1>
            <p className="p-4 text-2xl text-[#b1ada1] text-center tracking-widest">
                This is where the superpowers live — the place with all the
                buttons you definitely don’t want in the hands of regular users.
                From viewing every account in the database to creating,
                deleting, updating emails, and switching user roles, the Admin
                Panel puts the real control tools on display. It’s a perfect
                reminder that with great permissions comes… well, the
                responsibility not to break everything.
            </p>
        </div>
    );
}

export default WelcomeAdminDashboard;
