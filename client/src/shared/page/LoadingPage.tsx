import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingPage = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 10000);
        const t2 = setTimeout(() => setStage(2), 25000);
        const t3 = setTimeout(() => setStage(3), 50000);
        const t4 = setTimeout(() => setStage(4), 70000);

        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, []);

    return (
        <div className="fixed inset-0 grid place-items-center bg-black text-white/70">
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

                <div className="fixed bottom-5 px-4 text-center text-lg">
                    {stage === 1 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            Waking up the server… this usually takes a few
                            seconds.
                        </motion.p>
                    )}

                    {stage === 2 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            The app is hosted on a free server, so the first
                            load may take a little longer than usual.
                        </motion.p>
                    )}

                    {stage === 3 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            Almost there… the server is finishing its startup
                            process.
                        </motion.p>
                    )}

                    {stage === 4 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            This is taking longer than expected. Please refresh
                            the page or try again in a few moments.
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
