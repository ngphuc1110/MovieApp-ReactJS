import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import axios from 'axios';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const trendingData = useSelector((state) => state.movieData.bannerData);
    const { data: nowPlayingData } = useFetch("movie/now_playing")
    const { data: topRatedData } = useFetch("movie/top_rated")
    const { data: popularTvData } = useFetch("tv/popular")
    const { data: onTheAirData } = useFetch("tv/on_the_air")

    return (
        <div className=' py-16'>
            <BannerHome />
            <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true} />
            <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
            <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"} />
            <HorizontalScrollCard data={popularTvData} heading={"Popular TV Shows"} media_type={"tv"} />
            <HorizontalScrollCard data={onTheAirData} heading={"On The Air"} media_type={"tv"} />
        </div>
    )
}

export default Home