import Clipboard from "./Credentials/Clipboard";
import credentials from "../home.data";
import Inconvenience from "./Credentials/Inconvenience";
import { useState } from "react";

function Credentials() {
    const [realTime, setRealTime] = useState(false);

    return (
        <div className="m-4 rounded-xl bg-[#111111] p-6 text-center tracking-widest text-[#b1ada1] sm:pr-20 sm:pl-20 sm:text-xl/8 md:pr-30 md:pl-30 md:text-2xl/10">
            <h1 className="m-3 text-lg font-bold tracking-widest text-[#f4f3ee] sm:text-3xl">
                Credentials
            </h1>
            <p>
                Sample Admin and User credentials are provided so you can switch
                roles and experience both perspectives seamlessly.
            </p>
            <div className="mt-4 flex flex-col justify-evenly gap-4 md:flex-row">
                <Clipboard
                    email={credentials.userEamil}
                    password={credentials.userPassword}
                    role="User"
                    setRealTime={setRealTime}
                />
                <Clipboard
                    email={credentials.adminEmail}
                    password={credentials.adminPassword}
                    role="Admin"
                    setRealTime={setRealTime}
                />
            </div>
            {realTime && <Inconvenience />}
        </div>
    );
}

export default Credentials;
