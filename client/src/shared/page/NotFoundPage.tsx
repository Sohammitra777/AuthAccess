import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex grow flex-col items-center justify-center bg-black text-[#f4f3ee]">
            <h1 className="text-5xl font-bold tracking-wider">404</h1>

            <p className="m-2 mt-4 text-center text-xl text-[#b1ada1] sm:text-2xl">
                Thank you for visiting — the page you are looking for does not
                exist.
            </p>

            <button
                className="mt-4 cursor-pointer rounded-xl border border-[#b1ada1] px-6 py-2 font-mono tracking-wide duration-150 hover:bg-zinc-800"
                onClick={() => navigate("/")}
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFoundPage;
