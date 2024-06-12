// eslint-disable-next-line no-unused-vars
import React from 'react';
import TrendingMovies from "../components/TrendingMovies"
// import { HiOutlineChevronRight } from "react-icons/hi";
// import { HiOutlineChevronLeft } from "react-icons/hi";

export default function HomePage() {
    return (
        <section className="w-screen text-white text-justify">
            <div className="w-[100vw] h-[100vh] md:overflow-hidden -mt-[6vh] relative">
                <div>
                    <div className="absolute inset-0">
                        <img src="./src/assets/backdrop1.jpg" className="hidden md:block md:w-screen md:h-screen md:cover" />
                        <img src="./src/assets/poster1.jpg" className="md:hidden w-screen h-screen" />
                        <div className="absolute md:top-[40%] top-[40%] md:w-[30%] w-[80%] md:h-fit flex-col pl-2 left-[10%] bg-zinc-800 rounded-xl bg-opacity-70 border border-zinc-800 text-white">
                            <h1 className="font-bold md:text-[5rem] text-[2rem] tracking-[1rem]">Titre</h1>
                            <h2 className="md:text-2xl md:pb-4">Catégories</h2>
                            <p className="md:text-xl md:pb-4">Année de sortie</p>
                            <p className="md:text-lg pb-2 truncate ...">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus accusantium in odit blanditiis alias voluptate numquam facere. Ex temporibus ea numquam! Nesciunt dolorem at quae molestias recusandae vel eveniet laboriosam.</p>
                            <div>
                                <button className="bg-white text-black md:text-lg text-s w-fit md:w-[8rem] mb-2 tracking-[0.2rem] p-3 rounded-lg mt-4">
                                    Voir tout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TrendingMovies />
        </section>
    )
}

