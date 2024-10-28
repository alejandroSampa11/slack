import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/app/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/app/features/workspaces/store/use-create-workspace-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function WorkspaceSwitcher() {

    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const [_open, setOpen] = useCreateWorkspaceModal();
    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

    const filteredWorkspaces = workspaces?.filter((x) => x._id !== workspaceId);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                    {workspaceLoading ? (<Loader className="size-5 animate-spin shrink-0" />) : workspace?.name.charAt(0).toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className="cursor-pointer flex-col justify-start items-start capitalize" >
                    {workspace?.name}
                    <span className="text-xs text-muted-foreground">
                        Active Workspace
                    </span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((x) => (
                    <DropdownMenuItem className="cursor-pointer capitalize" onClick={() => router.push(`/workspace/${x._id}`)} key={x._id}>
                        <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                            {x.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="truncate">{x.name}</p>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
                    <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                        <Plus />
                    </div>
                    Create a new workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default WorkspaceSwitcher;
