"use client";

import Lottie from "lottie-react";
import * as animationData from "@/public/lottie/animation_lkzg9qip.json"

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <Lottie 
            animationData={animationData}
            loop
            className="h-[200px] w-[200px] bg-black mb-20"
            color="black"
        />
    </div>

  )
}

export default Loader