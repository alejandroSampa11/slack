"use client"

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id"
import { useState } from "react";

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const  {data} = useGetWorkspace({id: workspaceId});

  return (
    <div>Workspace id page</div>
  )
}
