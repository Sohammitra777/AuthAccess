function WelcomeUserDashboard(){
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl">Welcome to the User Dashboard.</h1>
            <p className="p-4 text-2xl text-[#b1ada1] text-center tracking-widest">
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
};

export default WelcomeUserDashboard;