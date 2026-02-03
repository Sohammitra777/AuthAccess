import Clipboard from "./Credentials/Clipboard";
import credentials from "../home.data";
import Inconvenience from "./Credentials/Inconvenience";
import { useState } from "react";

function Credentials() {
    const [realTime, setRealTime] = useState(false);

    return (
        <div className="m-4 rounded-xl bg-[#111111] p-4 text-center text-[#b1ada1]">
            <h1 className="mb-2 text-lg font-bold tracking-widest text-[#f4f3ee] sm:text-2xl">
                Credentials
            </h1>
            <p className="text-sm/6 text-[#b1ada1] sm:text-lg/8 lg:text-lg/10">
                Sample Admin and User credentials are provided so you can switch
                roles and experience both perspectives seamlessly.
            </p>
            <div className="mt-2 flex flex-col justify-evenly gap-4 md:flex-row">
                <Clipboard
                    email={credentials.adminEmail}
                    password={credentials.adminPassword}
                    role="Admin"
                    setRealTime={setRealTime}
                />
                <Clipboard
                    email={credentials.userEamil}
                    password={credentials.userPassword}
                    role="User"
                    setRealTime={setRealTime}
                />
            </div>
            {realTime && <Inconvenience />}
        </div>
    );
}

export default Credentials;
