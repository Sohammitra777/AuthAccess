import assets from "../../../assets/assets";
import FooterLinks from "./FooterLinks";

function Footer() {
    return (
        <div className="mt-6 flex w-full flex-col items-center border-t border-[#2A2A2A] bg-[#0F0F0F] pb-4 font-mono tracking-wide sm:pb-0">
            <h1 className="mt-2 text-sm text-[#C96A45] sm:text-xl lg:text-2xl">
                Want to Know More About Me?
            </h1>
            <div className="m-2 mb-0 flex w-full justify-evenly text-sm sm:mt-2 sm:mb-4">
                <FooterLinks
                    text="Portfolio"
                    link=""
                    source={assets.icons.portfolioIcon}
                    alterText="portfolio image"
                />
                <FooterLinks
                    text="Resume"
                    link=""
                    source={assets.icons.resumeIcon}
                    alterText="resume image"
                />
                <FooterLinks
                    text="Github"
                    link=""
                    source={assets.icons.githubIcon}
                    alterText="github image"
                />
            </div>
        </div>
    );
}

export default Footer;
