// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default function HomePage() {
    return (
        <section className="w-screen text-white text-justify">
            <div className="w-[100vw] h-[100vh] md:overflow-hidden -mt-[6vh] relative">
                <div>
                    <div className="absolute inset-0">
                        <img src="./src/assets/backdrop1.jpg" className="hidden md:block md:w-screen md:h-screen md:cover" />
                        <img src="./src/assets/poster1.jpg" className="md:hidden w-screen h-screen" />
                        <div className="absolute top-[20%] w-screen max-w-[80%] left-[50%] -translate-x-[50%] pr-[30%] box-border drop-shadow-xl">
                            <h1 className="font-bold md:text-[5rem] text-[2rem] tracking-[1rem]">Titre</h1>
                            <h2 className="md:text-2xl pb-4">Catégories</h2>
                            <p className="md:text-xl">Année de sortie</p>
                            <p className="md:text-xl pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus accusantium in odit blanditiis alias voluptate numquam facere. Ex temporibus ea numquam! Nesciunt dolorem at quae molestias recusandae vel eveniet laboriosam.</p>
                            <div>
                                <button className="bg-white text-black text-lg w-fit tracking-[0.2rem] p-3 rounded-lg mt-4">
                                    Voir tout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0">
                        <img src="./src/assets/backdrop2.jpg" className="hidden md:block md:w-screen md:h-screen md:cover" />
                        <img src="./src/assets/poster2.jpg" className="md:hidden w-screen h-screen" />
                        <div className="absolute top-[20%] w-screen max-w-[80%] left-[50%] -translate-x-[50%] pr-[30%] box-border drop-shadow-xl">
                            <h1 className="font-bold md:text-[5rem] text-[2rem] tracking-[1rem]">Titre</h1>
                            <h2 className="md:text-2xl pb-4">Catégories</h2>
                            <p className="md:text-xl">Année de sortie</p>
                            <p className="md:text-xl pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus accusantium in odit blanditiis alias voluptate numquam facere. Ex temporibus ea numquam! Nesciunt dolorem at quae molestias recusandae vel eveniet laboriosam.</p>
                            <div>
                                <button className="bg-white text-black text-lg w-fit tracking-[0.2rem] p-3 rounded-lg mt-4">
                                    Voir tout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0">
                        <img src="./src/assets/backdrop1.jpg" className="hidden md:block md:w-screen md:h-screen md:cover" />
                        <img src="./src/assets/poster1.jpg" className="md:hidden w-screen h-screen" />
                        <div className="absolute top-[20%] w-screen max-w-[80%] left-[50%] -translate-x-[50%] pr-[30%] box-border drop-shadow-xl">
                            <h1 className="font-bold md:text-[5rem] text-[2rem] tracking-[1rem]">Titre</h1>
                            <h2 className="md:text-2xl pb-4">Catégories</h2>
                            <p className="md:text-xl">Année de sortie</p>
                            <p className="md:text-xl pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus accusantium in odit blanditiis alias voluptate numquam facere. Ex temporibus ea numquam! Nesciunt dolorem at quae molestias recusandae vel eveniet laboriosam.</p>
                            <div>
                                <button className="bg-white text-black md:text-lg text-s w-fit tracking-[0.2rem] md:p-3 p-2 rounded-lg mt-4 font-bold">
                                    Voir tout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex md:absolute md:bottom-[100px] left-[50%] with-fit z-20 gap-[30px]">
                        <div className="w-[250px] h-[370px] shrink-0 relative">
                            <img src="./src/assets/poster1.jpg" className="rounded-xl border border-neutral-500" sizes='cover' />
                            <div className="absolute bottom-[10px] left-[10px] right-[10px]">
                                <h1 className="font-bold">
                                    Titre
                                </h1>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className="w-[250px] h-[370px]  shrink-0 relative">
                            <img src="./src/assets/poster2.jpg" className="rounded-xl border border-neutral-500" />
                            <div className="absolute bottom-[10px] left-[10px] right-[10px]">
                                <h1 className="font-bold">
                                    Titre
                                </h1>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className="w-[250px] h-[370px]  shrink-0 relative">
                            <img src="./src/assets/poster1.jpg" className="rounded-xl border border-neutral-500" />
                            <div className="absolute bottom-[10px] left-[10px] right-[10px]">
                                <h1 className="font-bold">
                                    Titre
                                </h1>
                                <p>Description</p>
                            </div>

                        </div>

                    </div>
                    <div className="hidden md:absolute top-[70%] right-[60%] md:flex text-black gap-14">
                        <button id="prev" ><IoIosArrowDropleftCircle size={70} color='white' /></button>
                        <button id="next" ><IoIosArrowDroprightCircle size={70} color='white' /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}
