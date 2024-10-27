"use client"


import CreateWorkspaceModal from '@/app/features/workspaces/components/create-workspace-modal'
import React, { useEffect, useState } from 'react'

function Modals() {
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted) return null;

  return (
    <>
        <CreateWorkspaceModal/>
    </>
  )
}

export default Modals;