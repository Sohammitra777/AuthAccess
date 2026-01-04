import { useAdminSeedData } from "../admin.mutations";
import adminAssets from "../assets/assets";

function EmptyList() {
    const { mutateAsync, isPending } = useAdminSeedData();
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <img
                className="h-30 w-30"
                src={adminAssets.icon.emptyIcon}
                alt="empty basked icon"
            />
            <p>No data, No Worries</p>
            <button
                className="m-4 mb-0 cursor-pointer rounded-lg bg-[#c15f3c] p-2 pr-4 pl-4 font-mono font-bold text-[#f4f3ee] duration-150 ease-in"
                onClick={async () => {
                    await mutateAsync();
                }}
            >
                {isPending ? "Seeding" : "Seed Data"}
            </button>
        </div>
    );
}

export default EmptyList;
