import { useAdminSeedData } from "../admin.mutations";
import adminAssets from "../assets/assets";

function EmptyList() {
    const { mutate, isPending } = useAdminSeedData();
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <img
                className="w-30 h-30"
                src={adminAssets.icon.emptyIcon}
                alt="empty basked icon"
            />
            <p>No data, No Worries</p>
            <button
                className="mb-0 m-4 pr-4 pl-4 p-2 font-mono font-bold bg-[#c15f3c] text-[#f4f3ee]
                   rounded-lg cursor-pointer duration-150 ease-in"
                onClick={() => {
                    mutate();
                }}
            >
                {isPending ? "Seeding" : "Seed Data"}
            </button>
        </div>
    );
}

export default EmptyList;
