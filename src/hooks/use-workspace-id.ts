import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";


function useWorkspaceId() {
    const params = useParams();
  return params.workspaceId  as Id<"workspaces">
}

export default useWorkspaceId