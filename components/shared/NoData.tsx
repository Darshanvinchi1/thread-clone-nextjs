"use client";

import React from 'react'
import Lottie from "lottie-react";
import * as animationData from "@/public/lottie/animation_ll093zuz.json"


const NoData = ({ title }: { title: string }) => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <p className='no-result'>{title}</p>
         <Lottie 
            animationData={animationData}
            loop
            className="h-[300px] w-[300px] bg-black mb-20"
            color="black"
        />
    </div>
  )
}

export default NoData