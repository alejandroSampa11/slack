import useCurrentMember from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspace-header";


function WorkspaceSideBar() {

    const workspaceId = useWorkspaceId();
    const  {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
    const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});

    if(workspaceLoading || memberLoading){
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full justify-center items-center">
                <Loader className="size-5 animate-spin text-white"/>
            </div>
        )
    }

    if(!workspace || !member){
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full justify-center items-center">
                <AlertTriangle className="size-5 text-white"/>
                <p className="text-white text-sm">Workspace not found</p>
            </div>
        )
    }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
        <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
    </div>
  )
}

export default WorkspaceSideBar