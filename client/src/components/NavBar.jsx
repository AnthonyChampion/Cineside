import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoMdSearch } from 'react-icons/io';

export default function NavBar() {

    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);

    function openModal() {
        setFilterModalIsOpen(!filterModalIsOpen);
    }

    const [openMenu, setOpenMenu] = useState(false);
    const handleClick = () => {
        setOpenMenu(!openMenu);
    }


    const content = <>
        <div className="md:hidden z-10 block justify-end absolute w-screen left-0 right-0 transition">
            <ul className="h-screen text-center text-white text-2xl my-8 border border-red-400  bg-opacity-95">
                <Link to="categories">
                    <div className="mt-2">
                        <button
                            onClick={openModal}>
                            Catégories
                        </button>
                    </div>
                </Link>
                <Link to="top_TMDB">
                    <div className='flex justify-center mt-4'>
                        <li className="transition cursor-pointer pr-1">Top
                        </li>
                        <img src="../src/assets/tmdb.png" className="w-10" />
                    </div>
                </Link>
                <Link to="favoris">
                    <li className="mt-4" onClick={() => setOpenMenu(false)}>Mes favoris</li>
                </Link>
            </ul>
        </div>
    </>


    return (
        <nav className="md:w-[75vw] w-[85vw]">
            <div className="flex items-center justify-center h-[5vh] text-white">
                <div>
                    {openMenu && content}
                </div>
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <button className="block md:hidden transition" onClick={handleClick}>
                            {openMenu ? <FaTimes className="size-5" /> : <TiThMenuOutline className="size-6 items-center mt-1" />}
                        </button>
                    </Link>
                    <div className="md:absolute left-1 top-8 flex">
                        <img src="../src/assets/cinelogo.png" className="w-8 h-8" />
                        <Link className="text-3xl" to="/"><span className="text-green-400 pl-1">ine</span>side</Link>
                    </div>
                    <div>
                        <IoMdSearch className="size-6 md:hidden" />
                    </div>
                </div>
                <div className="hidden md:flex md:justify-between md:items-center md:w-full text-xl">
                    <div className="flex">
                        <ul className="flex space-x-20">
                            <Link to="categories">
                                <div className="">
                                    <button
                                        onClick={openModal}>
                                        Catégories
                                    </button>
                                </div>
                            </Link>
                            <Link to="top_TMDB">
                                <div className='flex'>
                                    <li className="transition cursor-pointer pr-1">Top
                                    </li>
                                    <img src="../src/assets/tmdb.png" className="w-10" />
                                </div>
                            </Link>
                            <Link to="favoris">
                                <li className=" transition cursor-pointer">Mes favoris</li>
                            </Link>
                            <Link to="favoris">
                                <li className=" transition cursor-pointer">Connexion</li>
                            </Link>
                            <Link to="favoris">
                                <li className=" transition cursor-pointer">Inscription</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="flex items-center border border-zinc-800">
                        <IoMdSearch className="absolute size-8 pl-2" />
                        <input className="rounded-md h-10 w-[25vw] bg-zinc-950 text-center " type="text" placeholder="Rechercher un film" />
                    </div>

                </div>

            </div>
        </nav>
    );
}
