function ImageLink({
    link,
    source,
    alterText,
}: {
    link: string;
    source: string;
    alterText: string;
}) {
    return (
        <a href={link}>
            <img className="w-7 h-7 sm:w-10 sm:h-10" src={source} alt={alterText} />
        </a>
    );
}

export default ImageLink;
