"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const {user} = useUser();

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div className='flex items-center justify-between px-5'>
       
       <div className='w-8 h-8' style={{width:'30px',height:'30px'}}>
       <UserButton showName  afterSignOutUrl='/'/>
       </div>

    </div>
  );
};

export default Greeting;
