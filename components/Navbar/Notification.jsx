import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiBell } from "react-icons/pi";

export function Notification({ notifyMessage }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full ">
          <Avatar className="h-8 w-8 overflow-visible ">
            <AvatarFallback>
              <PiBell className="text-xl" />
              <span className="absolute -top-2 -right-2 h-4 w-4 text-xs rounded-full bg-slate-600 text-white flex justify-center items-center items cursor-pointer">
                1
              </span>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Message title</p>
            <p className="text-xs leading-none text-muted-foreground">
              Message desc
            </p>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
