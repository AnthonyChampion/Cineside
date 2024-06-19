import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoMdSearch } from 'react-icons/io';
import { IoLogIn } from 'react-icons/io5';
import MovieSearch from './MovieSearch'; // Assuming MovieSearch component is in the same directory

export default function NavBar() {
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false); // State to control visibility of MovieSearch component

    function openModal() {
        setFilterModalIsOpen(!filterModalIsOpen);
    }

    const handleClick = () => {
        setOpenMenu(!openMenu);
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const mobileContent = (
        <div className="md:hidden z-10 block absolute justify-center w-[90%] right-5 top-14 transition">
            <ul className="h-[500px] text-center text-white text-2xl bg-zinc-900 bg-opacity-90 border border-black rounded-xl pt-20">
                <Link to="films">
                    <div>
                        <button onClick={openModal}>
                            Films
                        </button>
                    </div>
                </Link>
                <Link to="top_TMDB">
                    <div className='flex justify-center mt-4'>
                        <li className="transition cursor-pointer pr-1">Top</li>
                        <img src="../src/assets/tmdb.png" className="w-10" alt="tmdb-logo" />
                    </div>
                </Link>
                <Link to="favoris">
                    <li className="mt-4" onClick={() => setOpenMenu(false)}>Mes favoris</li>
                </Link>
            </ul>
        </div>
    );

    return (
        <nav className="w-screen h-[6vh] relative z-10">
            <div className="flex items-center justify-center p-2 text-white bg-zinc-900 bg-opacity-50">
                <div>
                    {openMenu && mobileContent}
                </div>
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <button className="block md:hidden transition" onClick={handleClick}>
                            {openMenu ? <FaTimes className="size-5" /> : <TiThMenuOutline className="size-6 items-center mt-1" />}
                        </button>
                    </Link>
                    <div className="flex">
                        <img src="../src/assets/cinelogo.png" className="w-6 h-6 mt-1" alt="cinelogo" />
                        <Link className="text-2xl" to="/"><span className="text-green-400 pl-[2px]">ine</span>side</Link>
                    </div>
                    <div>
                        <IoMdSearch className="size-6 md:hidden cursor-pointer" onClick={toggleSearch} />
                    </div>
                </div>
                <div className="hidden md:flex md:justify-between md:items-center md:w-screen pr-8 p-2 text-lg ">
                    <div className="flex">
                        <ul className="flex space-x-12 ml-8">
                            <Link to="favoris" className='flex items-center '>
                                <button className="transition cursor-pointer w-[6.5rem] text-[16px]">Connexion</button>
                                <IoLogIn size={36} />
                            </Link>
                            <Link to="films">
                                <li className="transition cursor-pointer w-[6.5rem] text-[16px] mt-2">Films</li>
                            </Link>
                            <Link to="top_TMDB">
                                <div className='flex w-[6.5rem] justify-center items-center mt-2'>
                                    <li className="transition cursor-pointer mr-1 text-[16px]">Top</li>
                                    <img src="../src/assets/tmdb.png" className="w-8 h-7" alt="tmdb-logo" />
                                </div>
                            </Link>
                            <div className="w-[50rem] flex justify-end">
                                <MovieSearch />
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
