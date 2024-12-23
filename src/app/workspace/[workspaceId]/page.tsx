"use client"

import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
import useCurrentMember from "@/app/features/members/api/use-current-member";
import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id"
import { Loader, Triangle, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const  {data} = useGetWorkspace({id: workspaceId});
  const router = useRouter();
  const [open, setOpen] = useCreateChannelModal();

  const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
  const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});
  const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId}); 
  
  const channelId = useMemo(()=> channels?.[0]?._id,[channels]);
  const isAdmin = useMemo(()=> member?.role === "admin", [member?.role]);

  useEffect(()=>{
    if(workspaceLoading || !member || channelsLoading || memberLoading || !workspace) return;
    if(channelId){
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    }else if(!open && isAdmin){
      setOpen(true);
    }
  },[member, memberLoading, isAdmin, channelId, workspaceLoading, channelsLoading, workspace, open, setOpen, router, workspaceId]);

  if(workspaceLoading || channelsLoading){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground"/>
      </div>
    );
  }

  if(!workspace){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground"/>
        <span className="text-sm text-muted-foreground">Workspace not found</span>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6 text-muted-foreground"/>
      <span className="text-sm text-muted-foreground">No Channel Found</span>
    </div>
  );
};

//TODO: 10:10 CHANNEL PAGE