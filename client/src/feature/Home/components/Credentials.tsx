import Clipboard from "./Credentials/Clipboard";
import credentials from "../home.data";

function Credentials() {
  return (
    <div className="m-4 rounded-xl bg-[#111111] p-6 text-center text-sm tracking-widest text-[#b1ada1] sm:pr-30 sm:pl-30 sm:text-2xl/10">
      <h1 className="m-3 text-lg font-bold tracking-widest text-[#f4f3ee] sm:text-3xl">
        Credentials
      </h1>
      <p>
        Sample Admin and User credentials are provided so you can switch roles
        and experience both perspectives seamlessly.
      </p>
      <div className="mt-4 flex flex-col justify-evenly gap-2 sm:flex-row">
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
