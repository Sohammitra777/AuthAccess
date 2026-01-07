function Welcome() {
    return (
        <ul className="mr-2 ml-2 rounded-xl p-2 text-center text-sm/6 text-[#b1ada1] sm:mr-5 sm:ml-5 sm:p-6 sm:pr-10 sm:pl-10  lg:text-lg/8">
            <li className="mb-2">
                Welcome to AuthAccess — a hands-on playground for authentication
                and authorization.
            </li>
            <li className="mb-2">
                It’s practical, engaging, and built with real-world,
                production-ready standards in mind.
            </li>
            <li className="mb-2">
                Even as a learning project, it follows enterprise-grade design
                principles.
            </li>
            <li className="mb-2">
                It will continue to grow with features like session hardening,
                2FA, and OAuth integration.
            </li>
        </ul>
    );
}

export default Welcome;
