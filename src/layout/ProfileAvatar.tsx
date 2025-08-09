import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "react-responsive";

interface IAvatarProps {
  name: string;
  image?: string;
  logOutFn: () => Promise<void>;
}

const ProfileAvatar = ({ name, image, logOutFn }: IAvatarProps) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image || "https://avatars.githubusercontent.com/u/124599?v=4"}
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={isMobile ? "end" : "start"}>
        <DropdownMenuItem className="cursor-pointer">
          My Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOutFn} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
