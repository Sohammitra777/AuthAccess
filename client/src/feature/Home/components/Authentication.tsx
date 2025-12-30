import homeAssets from "../assets/assets";

function Authentication() {
    return (
        <main className="m-1 sm:m-4 sm:p-4 lg:mr-5 lg:ml-5 lg:pr-30 lg:pl-30 pb-10 rounded-xl text-[#b1ada1] bg-[#111111] text-center md:text-2xl/10 tracking-widest">
            <h1 className="m-5 text-[#f4f3ee] text-2xl md:text-4xl font-bold">
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
                    className="w-40 h-40 hidden lg:block "
                    src={homeAssets.icon.authentication}
                    alt="authentication image"
                />
            </div>
            <p className="mb-5 text-[#c15f3c] font-bold text-3xl">
                Flow Diagram
            </p>
            <div className="flex justify-evenly md:justify-between gap-2">
                {homeAssets.image.map((img) => (
                    <a
                        className="p-1 sm:pr-2 sm:pl-2 border-2 border-[#c15f3c] hover:border-[#b1ada1]
                        text-[#f4f3ee] hover:text-[#c15f3c] rounded-lg duration-150 ease-in-out"
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
