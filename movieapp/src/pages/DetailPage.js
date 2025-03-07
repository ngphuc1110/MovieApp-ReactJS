import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetail from '../hooks/useFetchDetail';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import useFetch from '../hooks/useFetch';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

const DetailPage = () => {
    const params = useParams()
    const imageURL = useSelector((state) => state.movieData.imageURL);
    const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`)
    const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`)
    const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
    const { data: recommendationsData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
    const [playVideo, setPlayVideo] = useState(false)
    const [playVideoData, setPlayVideoData] = useState("")
    window.scrollTo({ top: 20, behavior: "smooth" });

    const director = castData?.crew?.filter(el => el?.job === "Director")?.map(el => el?.name).join(", ")
    const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name).join(", ")
    // const directorOfPhotography = castData?.crew?.filter(el => el?.job === "Director of Photography")?.map(el => el?.name).join(", ")
    // const producer = castData?.crew?.filter(el => el?.job === "Producer")?.map(el => el?.name).join(", ")
    // const specialEffectsSupervisor = castData?.crew?.filter(el => el?.job === "Special Effects Supervisor")?.map(el => el?.name).join(", ")
    // const editor = castData?.crew?.filter(el => el?.job === "Editor")?.map(el => el?.name).join(", ")
    // const specialEffectsMakeupArtist = castData?.crew?.filter(el => el?.job === "Special Effects Makeup Artist")?.map(el => el?.name).join(", ")
    // const artDirection = castData?.crew?.filter(el => el?.job === "Art Direction")?.map(el => el?.name).join(", ")
    const handlePlayVideo = (data) => {
        setPlayVideoData(data)
        setPlayVideo(true)
    }

    return (
        <div className='pb-5'>
            <div className='w-full h-[400px] relative hidden lg:block '>
                <div className='h-full w-full'>
                    <img
                        src={imageURL + data?.backdrop_path}
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='absolute w=full h-full top-0 bg-gradient-to-b from-neutral-900/90 to-transparent '></div>
            </div>

            <div className='container mx-auto px-5 py-10 lg:py-0 flex flex-col gap-5 lg:flex-row lg:gap-10'>
                <div className='lg:-mt-32 relative mx-auto w-fit lg:mx-0 my-6'>
                    <img
                        src={imageURL + data?.poster_path}
                        className='lg:min-h-[384px] lg:min-w-[280px] w-60 h-80 object-cover rounded'
                    />
                    <button onClick={() => handlePlayVideo(data)}
                        className='mt-3 w-full h-14 py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>
                        Play
                    </button>
                </div>
                <div className='pt-3'>
                    <h2 className='text-3xl font-bold text-white'>{data?.title || data?.name}</h2>
                    <p className='text-neutral-400'>{data?.tagline}</p>
                    <Divider />
                    <div className='flex items-center gap-3 text-center'>
                        <p>
                            <span className='text-white'>Rating</span>: {Number(data?.vote_average).toFixed(1)}+
                        </p>
                        <span>|</span>
                        <p>
                            <span className='text-white'>Views</span> : {Number(data?.vote_count).toFixed(0)}
                        </p>
                        <span>|</span>
                        <p>
                            <span className='text-white'>Duration</span>: {Number(data?.runtime).toFixed(0)} mins
                        </p>
                    </div>
                    <Divider />
                    <div>
                        <h3 className='text-xl font-bold text-white mb-1'>Overview:</h3>
                        <p>{data?.overview}</p>
                    </div>
                    <Divider />
                    <div className='flex items-center gap-3 text-center'>
                        <p><span className='text-white'>Status</span>: {data?.status}</p>
                        <span>|</span>
                        <p><span className='text-white'>Release Date</span>: {moment(data?.release_date).format("MMMM Do YYYY")}</p>
                        <span>|</span>
                        <p><span className='text-white'>Country</span>: {data?.origin_country?.[0]}</p>
                    </div>
                    <Divider />
                    <div className='flex items-center gap-3 text-center'>
                        <p><span className='text-white'>Director</span>: {director || "Nah"}</p>
                        <span>|</span>
                        <p><span className='text-white'>Writer</span>: {writer || "Nah"}</p>
                        {/* <p><span className='text-white'>Art Direction</span> : {artDirection}</p>
                        <p><span className='text-white'>Director of Photography</span> : {directorOfPhotography}</p>
                        <p><span className='text-white'>Special Effects Supervisor</span> : {specialEffectsSupervisor}</p>
                        <p><span className='text-white'>Special Effects Makeup Artist</span> : {specialEffectsMakeupArtist}</p>
                        <p><span className='text-white'>Producer</span> : {producer}</p>
                        <p><span className='text-white'>Editor</span> : {editor}</p> */}
                    </div>
                    <Divider />
                    <h2 className='text-lg font-bold pb-3'>Cast:</h2>
                    <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-3'>
                        {
                            castData?.cast?.filter(el => el?.profile_path).map((data, index) => {
                                return (
                                    <div>
                                        <div>
                                            <img
                                                src={imageURL + data?.profile_path}
                                                className='w-24 h-24 rounded-full object-cover '
                                            />
                                        </div>
                                        <p className='font-bold text-center text-sm text-neutral-400'>{data?.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <HorizontalScrollCard data={similarData} heading={`Similar ` + params?.explore} media_type={params?.explore} />
                <HorizontalScrollCard data={recommendationsData} heading={`Recommendations ` + params?.explore} media_type={params?.explore} />
            </div>
            {
                playVideo && (
                    <VideoPlay data={playVideoData} close={() => setPlayVideo(false)} media_type={params?.explore} />
                )
            }

        </div>
    )
}

export default DetailPage