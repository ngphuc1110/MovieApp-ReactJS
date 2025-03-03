import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
    const params = useParams()
    const [pageNum, setPageNum] = useState(1)
    const [data, setData] = useState([])
    const [totalPageNum, setTotalPageNum] = useState(0)
    const fetchData = async () => {
        try {
            const response = await axios.get(`/discover/${params.explore}`, {
                params: {
                    page: pageNum
                }
            })
            setData((preve) => {
                return [
                    ...preve,
                    ...response.data.results
                ]
            })
            setTotalPageNum(response.data.total_pages)
        } catch (error) {
            console.log("ExplorePage error", error)
        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.98) {
            setPageNum(preve => preve + 1)
        }
    }

    useEffect(() => {
        fetchData()
    }, [pageNum])

    useEffect(() => {
        setPageNum(1)
        setData([])
        fetchData()
    }, [params.explore])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

    }, [])
    return (
        <div className='py-16'>
            <div className='container mx-auto px-6'>
                <h3 className='capitalize text-lg lg:text-2xl my-2 font-semibold'>Popular {params.explore} show</h3>
                <div className='grid grid-cols-[repeat(auto-fit,270px)] gap-7 justify-center '>
                    {
                        data.map((data, index) => {
                            return (
                                <Card data={data} key={data.id + "explore" + index} media_type={params.explore}></Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExplorePage