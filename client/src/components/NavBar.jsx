// eslint-disable-next-line no-unused-vars
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
        <div className="md:hidden z-10 block absolute justify-center w-[90%] right-5 top-14 transition">
            <ul className="h-[500px] text-center text-white text-2xl bg-zinc-900 bg-opacity-90 border border-black rounded-xl pt-20">
                <Link to="categories">
                    <div className="">
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
        <nav className="w-screen h-[6vh] relative z-10">
            <div className="flex items-center justify-center p-4 text-white">
                <div>
                    {openMenu && content}
                </div>
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <button className="block md:hidden transition" onClick={handleClick}>
                            {openMenu ? <FaTimes className="size-5" /> : <TiThMenuOutline className="size-6 items-center mt-1" />}
                        </button>
                    </Link>
                    <div className="flex">
                        <img src="../src/assets/cinelogo.png" className="w-8 h-8" />
                        <Link className="text-3xl" to="/"><span className="text-green-400 pl-[2px]">ine</span>side</Link>
                    </div>
                    <div>
                        <IoMdSearch className="size-6 md:hidden" />
                    </div>
                </div>
                <div className="hidden md:flex md:justify-between md:items-end md:w-screen pr-8 text-lg">
                    <div className="flex items-center">
                        <ul className="flex space-x-12 mt-4 ml-8">
                            <Link to="favoris">
                                <button className=" transition cursor-pointer w-fit p-2 bg-zinc-500 text-white border border-zinc-900 rounded-xl -mt-4">Connexion
                                </button>
                            </Link>
                            <Link to="favoris">
                                <button className=" transition cursor-pointer w-fit p-2 rounded-xl border border-green-400 -mt-4">Inscription
                                </button>
                            </Link>
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
