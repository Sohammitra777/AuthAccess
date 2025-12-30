import Clipboard from "./Credentials/Clipboard";
import credentials from "../home.data";

function Credentials() {
    return (
        <div className="m-4 pr-30 pl-30 p-6 rounded-xl text-[#b1ada1] bg-[#111111] text-center text-2xl/10 tracking-widest">
            <h1 className="m-3 text-[#f4f3ee] text-3xl font-bold tracking-widest">
                Credentials
            </h1>
            <p>
                Sample Admin and User credentials are provided so you can switch
                roles and experience both perspectives seamlessly.
            </p>
            <div className="mt-4 flex justify-evenly">
                <Clipboard
                    email={credentials.userEamil}
                    password={credentials.userPassword}
                    role="User"
                />
                <Clipboard
                    email={credentials.adminEmail}
                    password={credentials.adminPassword}
                    role="Admin"
                />
            </div>
        </div>
    );
}

export default Credentials;
