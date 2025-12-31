import dashboardAssets from "../assets/assets";
import ImageLink from "./dashboardLinkComponents/ImageLink";

function DashboardLinks() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl sm:text-3xl text-[#c15f3c]">
                Want to Know More About Me?
            </h1>
            <div className="m-4 flex gap-20">
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
