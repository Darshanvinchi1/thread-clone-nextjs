"use client";

import { deleteThread, repostThread } from '@/lib/actions/thread.action';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

const RepostThread = ({ userId, ThreadId, isRepoat }: { userId: string, ThreadId: string, isRepoat?: boolean }) => {
    const pathname = usePathname();
    console.log(ThreadId,'ThreadId')
    return (
    <Image
        src='/assets/repost.svg'  //filter: invert(0.5) sepia(1) saturate(5) hue-rotate(218deg)
        alt='heart'
        width={24}
        height={24}
        className='cursor-pointer object-contain'
        onClick={async() => isRepoat ? await deleteThread(ThreadId, pathname) : repostThread(userId,ThreadId,pathname)}
    />
  )
}

export default RepostThread