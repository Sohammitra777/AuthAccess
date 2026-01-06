import homeAssets from "../assets/assets";

function Authentication() {
    return (
        <main className="m-4 mb-0 rounded-xl bg-[#111111] p-2 text-center text-[#b1ada1]">
            <h1 className="mt-4 mb-2 text-lg font-bold tracking-widest text-[#f4f3ee] sm:text-2xl md:text-3xl">
                Authentication
            </h1>
            <div className="flex items-center gap-6 text-sm/6 sm:text-lg/8 lg:text-xl/10">
                <p>
                    Experience a complete authentication workflow with secure
                    login, refresh tokens, and session handling. It’s built to
                    be explored — try it, test it, and see how the system
                    responds.
                </p>
                <img
                    className="hidden h-30 w-30 lg:block"
                    src={homeAssets.icon.authentication}
                    alt="authentication image"
                />
            </div>
            <p className="mb-2 text-lg font-bold text-[#c15f3c] sm:mb-4 sm:text-2xl lg:text-3xl">
                Flow Diagram
            </p>
            <div className="m-2 flex flex-wrap justify-evenly gap-2 text-sm md:justify-between md:text-lg lg:text-xl">
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
