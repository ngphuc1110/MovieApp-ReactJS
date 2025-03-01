import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
    const bannerData = useSelector((state) => state.movieData.bannerData);
    const imageURL = useSelector((state) => state.movieData.imageURL);

    const [currentImage, setCurrentImage] = useState(0)

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(preve => preve + 1)
        }
        else {
            setCurrentImage(0)
        }
    }
    const handlePrevious = () => {

        if (currentImage > 0) {
            setCurrentImage(preve => preve - 1)
        }
        else {
            setCurrentImage(bannerData.length - 1)
        }
    }

    useEffect(() => {
        // const interval = setInterval(() => {
        //     if (currentImage < bannerData.length - 1) {
        //         setCurrentImage(preve => preve + 1)
        //     } else
        //         setCurrentImage(0)
        // }, 2000)
        // return () => clearInterval(interval)
    }, [bannerData, imageURL])
    return (
        <section className="w-full h-full ">
            <div className="flex min-h-full max-h-[150vh] overflow-hidden">
                {
                    bannerData.map((data, index) => {

                        return (
                            <div key={data.id + "bannerHome" + index} className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <div className="h-full w-full">
                                    <img src={imageURL + data.backdrop_path}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* next and previous button */}
                                <div className=" absolute top-0 w-full h-full items-center justify-between px-5 group-hover:lg:flex hidden">
                                    <button onClick={handlePrevious} className=" bg-white p-1 rounded-full text-xl z-10 text-black ">
                                        <FaAngleLeft />
                                    </button>
                                    <button onClick={handleNext} className="bg-white p-1 rounded-full text-xl z-10 text-black ">
                                        <FaAngleRight />
                                    </button>
                                </div>

                                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent">
                                </div>
                                <div className="container mx-auto ">
                                    <div className="w-full absolute top-10 max-w-md px-3">
                                        <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">{data?.title || data?.name}</h2>
                                        <p className="text-white line-clamp-4 my-3">{data.overview}</p>
                                        <div className=" flex items-center gap-4 text-white">
                                            <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>View: {Number(data.popularity).toFixed(0)}</p>
                                        </div>
                                        <button className="bg-white px-4 py-2 text-black font-bold rounded mt-3 
                                        hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105">
                                            Play Now
                                        </button>
                                    </div>
                                </div>


                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default BannerHome;
