"use client"

import React from 'react'
import Toolbar from './Toolbar';

interface WorkspaceLayoutProps {
    children: React.ReactNode;
}

function WorkspaceIdLayout({children}:WorkspaceLayoutProps) {
  return (

    <div className='h-full'>
        <Toolbar/>
        {children}
    </div>
  )
}

export default WorkspaceIdLayout