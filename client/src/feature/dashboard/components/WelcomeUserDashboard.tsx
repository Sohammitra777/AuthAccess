function WelcomeUserDashboard() {
    return (
        <div className="flex grow flex-col items-center">
            <h1 className="grow text-xl sm:text-4xl">
                Welcome to the User Dashboard.
            </h1>
            <p className="grow p-4 text-center text-sm tracking-widest text-[#b1ada1] sm:text-2xl">
                This is the “no-superpowers” zone — a streamlined space where
                users can explore standard user-level features without
                accidentally breaking anything important. Unlike the admin view,
                users won’t find fancy controls or privileged actions here,
                because — surprise — regular users don’t get those. This
                dashboard intentionally reflects real-world role limitations…
                and yes, that’s exactly how access control is supposed to work.
            </p>
        </div>
    );
}

export default WelcomeUserDashboard;
