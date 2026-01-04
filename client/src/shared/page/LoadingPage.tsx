const LoadingPage = () => {
    return (
        <div className="fixed inset-0 grid place-items-center bg-black text-white">
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-semibold tracking-wide">
                        Made by
                    </h1>

                    <div className="mr-40 h-10 w-7 animate-spin rounded-full border-2 border-white/30" />
                </div>

                <p className="mt-1 ml-40 text-5xl italic opacity-80">
                    Soham Mitra
                </p>
            </div>
        </div>
    );
};

export default LoadingPage;
