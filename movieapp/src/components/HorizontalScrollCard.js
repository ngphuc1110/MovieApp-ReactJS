import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading }) => {
    const containerRef = useRef()

    // const handleNext = () => {
    //     if (currentImage < bannerData.length - 1) {
    //         setCurrentImage(preve => preve + 1)
    //     }
    //     else {
    //         setCurrentImage(0)
    //     }
    // }
    // const handlePrevious = () => {

    //     if (currentImage > 0) {
    //         setCurrentImage(preve => preve - 1)
    //     }
    //     else {
    //         setCurrentImage(bannerData.length - 1)
    //     }
    // }

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-2 '>{heading}</h2>
            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,270px)] grid-flow-col gap-7 px-3 overflow-x-scroll overflow-hidden relative z-10'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={true} />
                            )
                        })
                    }
                </div>
                <div className='absolute top-0 flex justify-between w-full items-center h-full'>
                    <button className=" bg-white p-1 rounded-full -ml-2 z-10 text-black  ">
                        <FaAngleLeft />
                    </button>
                    <button className="bg-white p-1 rounded-full -ml-2 z-10 text-black ">
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HorizontalScrollCard