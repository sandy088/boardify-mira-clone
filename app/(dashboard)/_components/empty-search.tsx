import Image from "next/image";

interface NotFoundProps {
    imgUrl: string;
    imageAlt?: string;
    title: string;
    subtitle: string;
    buttonElement?: JSX.Element;
}
const NotFound = ({imgUrl, imageAlt, title, subtitle, buttonElement}: NotFoundProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={imgUrl}
        alt={imageAlt?? 'Not Found'}
        width={140}
        height={140}
      />
      <h2 className=" text-2xl font-semibold mt-6">{title}</h2>

      <p className=" text-muted-foreground text-sm mt-2">
        {subtitle}
      </p>

      {
        buttonElement && (
            <div className=" mt-6">
                {buttonElement}
            </div>
        )
      }
    </div>
  );
};

export default NotFound;
