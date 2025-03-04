import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
    const containerRef = useRef()

    const handleNext = () => {
        containerRef.current.scrollLeft += 297.5
    }
    const handlePrevious = () => {
        containerRef.current.scrollLeft -= 297.5
    }

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-2 text-white capitalize'>{heading}</h2>
            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,272px)] grid-flow-col gap-7 px-3 overflow-x-scroll overflow-hidden relative z-10 scroll-smooth transition-all scrollbar-none'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
                            )
                        })
                    }
                </div>
                <div className='absolute top-0 hidden lg:flex justify-between w-full items-center h-full'>
                    <button onClick={handlePrevious} className=" bg-white p-1 rounded-full -ml-2 z-10 text-black  ">
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className="bg-white p-1 rounded-full -ml-2 z-10 text-black ">
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HorizontalScrollCard