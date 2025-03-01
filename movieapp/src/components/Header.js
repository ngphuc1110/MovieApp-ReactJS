import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { FaSearch } from "react-icons/fa";
import { navigation } from '../contants/Navigation';

const Header = () => {

    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate()



    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='fixed top-0 w-full h-16 bg-neutral-800 bg-opacity-80 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt='logo'
                        width={120}
                    />
                </Link>
                <nav className='hidden lg:flex items-center gap-5 ml-5'>
                    {
                        navigation.map((nav, index) => {
                            return (
                                <div key={"navigation" + index}>
                                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-3 hover:text-white ${isActive && "text-white"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>
                <div className=' ml-auto flex items-center gap-4 '>
                    <form className=' flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className=' text-white'>
                            <FaSearch />
                        </button>
                    </form>

                    <div className=' h-10 w-10 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img
                            src={userIcon}
                            alt='userIcon'
                            width="h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header