import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/header'

function AppLayout() {
  return (
    <div className='relative'>
      <div className='grid-background'></div>
      <main className='min-h-screen container px-4 sm:px-6 lg:px-8'>
        <Header/>
        <Outlet/>
      </main>
      <h3 className="text-center text-lg font-semibold">Built with ♥ by Vivek Gupta</h3>
    </div>
  );
};

export default AppLayout
