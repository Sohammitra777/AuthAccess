import dashboardAssets from "../../assets/assets";
import ImageLink from "./ImageLink";

function DashboardLinks() {
    return (
        <div className="flex w-full flex-col items-center p-4">
            <h1 className="text-xl text-[#c15f3c] sm:text-3xl">
                Want to Know More About Me?
            </h1>
            <div className="m-4 mb-0 flex w-full justify-evenly gap-20">
                <ImageLink
                    link=""
                    source={dashboardAssets.icons.portfolio}
                    alterText="portfolio image"
                />
                <ImageLink
                    link=""
                    source={dashboardAssets.icons.resume}
                    alterText="resume image"
                />
                <ImageLink
                    link=""
                    source={dashboardAssets.icons.github}
                    alterText="github image"
                />
            </div>
        </div>
    );
}

export default DashboardLinks;
