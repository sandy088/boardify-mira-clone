import Hint from "@/app/(dashboard)/_components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
}

const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor
}: UserAvatarProps) => {
    console.log("borderColor", borderColor)
  return (
    <Hint label={name || "Anonymous"} side="bottom" sideOffset={18}>
        <Avatar
         className=" h-8 w-8 border-[3px]"
         style={{borderColor: borderColor}}
        >
           <AvatarImage src={src}/>
           <AvatarFallback className=" text-xs font-semibold">{fallback}</AvatarFallback> 
        </Avatar>
    </Hint>
  )
}

export default UserAvatar