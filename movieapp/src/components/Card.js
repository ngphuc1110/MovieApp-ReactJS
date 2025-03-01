import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

const Card = ({ data, trending, index }) => {

    const imageURL = useSelector((state) => state.movieData.imageURL);

    return (
        <div className='w-full min-w-[270px] max-w-[270px] rounded h-100 overflow-hidden relative'>
            <img
                src={imageURL + data?.poster_path}
            />
            <div className='absolute top-4 '>
                {
                    trending && (
                        <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/50 overflow-hidden'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>
            <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold '>{data?.title || data?.name}</h2>
                <div className='text-sm text-neutral-400 flex justify-between items-center'>
                    <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
                    <p className='bg-black rounded-full px-2 text-xs'>Rating: {Number(data?.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card