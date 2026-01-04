import homeAssets from "../assets/assets";

function Authentication() {
    return (
        <main className="m-2 rounded-xl bg-[#111111] pb-10 text-center text-sm tracking-widest text-[#b1ada1] sm:p-4 md:text-2xl/10 lg:mr-5 lg:ml-5 lg:pr-30 lg:pl-30">
            <h1 className="m-5 text-lg font-bold text-[#f4f3ee] sm:text-2xl md:text-4xl">
                Authentication
            </h1>
            <div className="m-2 flex items-center gap-10">
                <p>
                    Experience a complete authentication workflow with secure
                    login, refresh tokens, and session handling. It’s built to
                    be explored — try it, test it, and see how the system
                    responds.
                </p>
                <img
                    className="hidden h-40 w-40 lg:block"
                    src={homeAssets.icon.authentication}
                    alt="authentication image"
                />
            </div>
            <p className="mb-5 text-lg font-bold text-[#c15f3c] sm:text-3xl">
                Flow Diagram
            </p>
            <div className="mr-1 flex justify-evenly gap-2 md:justify-between">
                {homeAssets.image.map((img) => (
                    <a
                        key={img[0]}
                        className="rounded-lg border border-[#c15f3c] p-1 text-[#f4f3ee] duration-150 ease-in-out hover:border-[#b1ada1] hover:text-[#c15f3c] sm:border-2 sm:pr-2 sm:pl-2"
                        target="_blank"
                        href={img[1]}
                    >
                        {img[0]}
                    </a>
                ))}
            </div>
        </main>
    );
}

export default Authentication;
