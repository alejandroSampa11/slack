"use client"

import React from 'react'
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';

interface WorkspaceLayoutProps {
    children: React.ReactNode;
}

function WorkspaceIdLayout({children}:WorkspaceLayoutProps) {
  return (

    <div className='h-full'>
        <Toolbar/>
        <div className='flex h-[calc(100vh-40px)]'>
          <Sidebar/>
          {children}
        </div>
    </div>
  )
}

export default WorkspaceIdLayout