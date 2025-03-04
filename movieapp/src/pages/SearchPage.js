import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
    const location = useLocation()
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const query = location?.search?.slice(3)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get(`/search/multi`, {
                params: {
                    query: location?.search?.slice(3),
                    page: page
                }
            })
            setData((preve) => {
                return [
                    ...preve,
                    ...response.data.results
                ]
            })
        } catch (error) {
            console.log("SearchPage error", error)
        }
    }

    useEffect(() => {
        if (query) {
            setPage(1)
            setData([])
            fetchData()
            setSearch(query.split("%20").join(" "))
        }
    }, [location?.search])

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.98) {
            setPage(preve => preve + 1)
        }
    }

    useEffect(() => {
        if (query) {
            fetchData()
        }
    }, [page])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

    }, [])

    return (
        <div className='py-16'>
            <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-40'>
                <input
                    className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-800'
                    type='text'
                    placeholder='Search here...'
                    value={search}
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                />
            </div>
            <div className='container mx-auto px-6'>
                <h3 className='capitalize text-lg lg:text-2xl my-2 font-semibold'>Search Results:</h3>
                <div className='grid grid-cols-[repeat(auto-fit,270px)] gap-7 items-center justify-center lg:justify-start'>
                    {
                        data.map((data, index) => {
                            return (
                                <Card data={data} key={data.id + "search" + index} media_type={data?.media_type}></Card>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default SearchPage