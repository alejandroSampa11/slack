"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../api/user-current-user"
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
  

function UserButton() {

    const {signOut} = useAuthActions(); 
    const {data, isLoading} = useCurrentUser();
    
    if(isLoading){
        return<Loader className="size-4 animate-spin text-muted-foreground"/>
    }
    if(!data){
        return null;
    }

    const {image, name} = data;
    const avatarFallback = name!.charAt(0).toUpperCase();

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/auth";
      };

  return (
    <DropdownMenu modal={true}>
        <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage alt={name} src={image}/>
                <AvatarFallback className="bg-sky-500 text-white">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
            <DropdownMenuItem onClick={()=> handleSignOut()} className="h-10 cursor-pointer">
                <LogOut className="size-4 mr-2"/>
                Log Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton