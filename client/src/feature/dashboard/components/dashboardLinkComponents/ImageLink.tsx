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
      <img className="h-7 w-7 sm:h-10 sm:w-10" src={source} alt={alterText} />
    </a>
  );
}

export default ImageLink;
