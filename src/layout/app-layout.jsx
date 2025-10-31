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
      <div className="p-10 text-center bg-gray-800 mt-10">Made with ♥ by Vivek Gupta</div>
    </div>
  );
};

export default AppLayout
