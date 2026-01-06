import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Inconvenience = () => {
    const text =
        "Thank you for your patience — the backend may take a moment to wake up on Render. The server starts once, but data is re-seeded for the sample logins on each use, which can make those loads slightly slower. To test real login performance, please sign in through the Login/Signup page. 🙏";

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            setDisplayed(text.slice(0, index + 1));
            index++;

            if (index === text.length) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="mt-4 text-xs/6 sm:text-sm/7 lg:text-lg/8"
            >
                <p className="whitespace-normal">{displayed}</p>
            </motion.div>
        </div>
    );
};

export default Inconvenience;
