import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/app/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/app/features/workspaces/api/use-remove.workspace";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import useConfirm from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

function PreferencesModal({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  );

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess() {
          toast.success("Workspace Updated");
          setEditOpen(false);
        },
        onError() {
          toast.error("Failed to Update Workspace")
        }
      }
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();
    if(!ok) return;
    
    removeWorkspace({ id: workspaceId }, {
      onSuccess() {
        toast.success("Workspace Removed Successfully");
        router.replace("/")
        setOpen(false);
      },
      onError() {
        toast.error("Failed to Removed Workspace");
      }
    })
  }

  return (
    <>
      <ConfirmDialog/>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b  bg-white">
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Workspace Name</p>
                    <p
                      className="text-sm text-[#1264A3] hover:underline font-semibold"
                      onClick={() => console.log("SI JALA")}
                    >
                      Edit
                    </p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this Workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isUpdatingWorkspace}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkspace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PreferencesModal;
