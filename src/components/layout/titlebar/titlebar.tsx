import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RedoIcon, SaveIcon, UndoIcon } from "lucide-react";

export function Titlebar() {
  return (
    <div
      className="flex flex-row justify-between items-center h-8 bg-gray-50 text-black text-sm"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* Left buttons */}
      <div className="flex gap-4 items-center space-x-2 px-5">
        {/* File */}
        <DropdownMenu>
          <DropdownMenuTrigger>File</DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View */}
        <DropdownMenu>
          <DropdownMenuTrigger>View</DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Extra Buttons */}
        <Button size="icon" variant={"ghost"} className="w-4 h-4">
          <SaveIcon />
        </Button>

        <Button size="icon" variant={"ghost"} className="w-4 h-4">
          <UndoIcon />
        </Button>

        <Button size="icon" variant={"ghost"} className="w-4 h-4">
          <RedoIcon />
        </Button>
      </div>

      {/* Right buttons */}
      <div className="flex flex-row items-center space-x-2"></div>
    </div>
  );
}
