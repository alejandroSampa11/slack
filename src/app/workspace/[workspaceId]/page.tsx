"use client"

import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id"

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const  {data} = useGetWorkspace({id: workspaceId});
  console.log(JSON.stringify(data))

  return (
    <div>{workspaceId}</div>
  )
}
