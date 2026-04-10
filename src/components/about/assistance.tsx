import React from 'react'
import { Button } from '../ui/button'

export default function Assistance() {
  return (
    <section className="mt-12 mb-28">
        <div className="container mx-auto">
            <div className="py-16 text-center bg-[#FFFFFF1A] rounded-xl">
                <h2 className='text-5xl font-bold text-white pb-8'>Need Immediate Assistance?</h2>
                <h4 className='text-xl text-[#F7E39F] font-semibold pb-8'>Call Our 24/7 Hotline</h4>
                <Button variant={"outline"} className='text-[#F7E39F] text-[16px]'>Request Emergency Visit</Button>
            </div>
        </div>
    </section>
  )
}
