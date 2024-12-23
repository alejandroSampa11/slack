import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";


function useChannelId() {
    const params = useParams();
  return params.channelId  as Id<"channels">
}

export default useChannelId