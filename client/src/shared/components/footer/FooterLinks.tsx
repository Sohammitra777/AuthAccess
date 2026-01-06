function FooterLinks({
    text,
    link,
    source,
    alterText,
}: {
    text: string;
    link: string;
    source: string;
    alterText: string;
}) {
    return (
        <a
            className="bg-red flex items-center gap-1 duration-300 hover:opacity-80 sm:gap-2"
            href={link}
        >
            <img
                className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 xl:h-10 xl:w-10"
                src={source}
                alt={alterText}
            />
            <p className="hidden text-[#E8D6C9] sm:block">{text}</p>
        </a>
    );
}

export default FooterLinks;
