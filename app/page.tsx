'use client'

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Home() {

  const data = useSession();

  console.log(data)
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Button onClick={() => signOut()}>Sign-Out</Button>
      <Button onClick={() => signIn()}>Sign-In</Button>
    </div>
  );
}