import React, { useEffect, useState } from 'react'
import { fetchTrendingMovies } from '../utils/moviedb';
import { register } from 'swiper/element/bundle';

register();

export default function TrendingMovies() {
    const [slides, setSlides] = useState(0);
    const [trending, setTrending] = useState([]);

    const setSlidesPerview = () => {
        setSlides(
            window.innerWidth < 640
                ? 3
                : window.innerWidth >= 640
                    ? 3
                    : 0
        );
    };

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data.results);
    }

    useEffect(() => {
        getTrendingMovies();
        setSlidesPerview();
        window.addEventListener("resize", setSlidesPerview);

        return () => {
            window.removeEventListener("resize", setSlidesPerview);
        };
    }, []);

    return (
        <section className="absolute md:w-[50%] w-screen top-[75%] md:top-[60%] md:left-[47%] left-[5%] h-fit flex justify-center pt-2">
            <div className="w-full md:h-fit relative">
                <swiper-container
                    centered-slides="true"
                    slides-per-view={slides}
                    loop="true">
                    {
                        trending.map((data) => (
                            <swiper-slide
                                key={data.id}>
                                <div className="md:w-[250px] md:h-[370px] w-[100px] h-[200px] shrink-0 relative">
                                    <img className="rounded-xl border border-neutral-500" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                    />
                                </div>
                            </swiper-slide>
                        ))
                    }

                </swiper-container>

            </div>
        </section>
    );
}
