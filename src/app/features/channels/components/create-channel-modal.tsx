import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { useCreateChannelModal } from "../store/use-create-channel-modal"
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useCreateChannel } from "../api/use-create-channel";
  
  function CreateChannelModal() {
    const workspaceId = useWorkspaceId();
    const [open, setOpen] = useCreateChannelModal();
    const {mutate, isPending} = useCreateChannel();
    const [name, setName] = useState("");

    const handleClose = ()=>{
        setName("");
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        mutate({
            name, workspaceId},
            {
                onSuccess: (id)=>{
                    //TODO: Redirect to new Channel
                    handleClose();
                }
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} placeholder="e.g. plan-budget" disabled={isPending} onChange={(e)=>handleChange(e)}/>
                    <div className="flex justify-end">
                        <Button disabled={false}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
  };
  
  export default CreateChannelModal