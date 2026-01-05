const LoadingPage = () => {
    return (
        <div className="fixed inset-0 grid place-items-center bg-black text-white">
            <div className="flex flex-col items-center gap-2 text-2xl sm:text-5xl">
                <div className="mr-20 flex items-center gap-3 sm:mr-40">
                    <h1 className="font-semibold tracking-wide text-[#c15f3c]">
                        Made by
                    </h1>

                    <div className="h-7 w-5 animate-spin rounded-full border-2 border-white/30 sm:h-10 sm:w-7" />
                </div>

                <p className="mt-1 ml-20 italic opacity-60 sm:ml-40">
                    Soham Mitra
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
