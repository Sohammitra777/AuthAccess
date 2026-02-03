import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Inconvenience = () => {
    const text =
        "The application resets all database data on every sample login by deleting and restoring the original state. To preserve your role or any data you’ve changed and to ensure normal performance, please use the Login/Signup page.";

    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            setDisplayed(text.slice(0, index + 1));
            index++;

            if (index === text.length) clearInterval(interval);
        }, 30);

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
