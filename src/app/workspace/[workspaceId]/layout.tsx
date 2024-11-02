"use client"

import React from 'react'
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import WorkspaceSideBar from './workspace-sidebar';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

function WorkspaceIdLayout({ children }: WorkspaceLayoutProps) {
  return (

    <div className='h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup
        direction='horizontal'
        autoSaveId="ca-workspace-layout"
        >
          <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5E2C5F]'>
            <WorkspaceSideBar/>
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default WorkspaceIdLayout