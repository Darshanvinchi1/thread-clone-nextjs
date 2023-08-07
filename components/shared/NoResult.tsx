"use client";

import React from 'react'
import Lottie from "lottie-react";
import * as animationData from "@/public/lottie/animation_ll08qtpi.json"


const NoResult = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <p className='no-result'>No Result</p>
         <Lottie 
            animationData={animationData}
            loop
            className="h-[300px] w-[300px] bg-black mb-20"
            color="black"
        />
    </div>
  )
}

export default NoResult