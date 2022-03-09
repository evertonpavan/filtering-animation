import { useEffect, useState } from "react";
import CardMovie from "../CardMovie";
import Filter from "../Filter";
import { motion, AnimatePresence } from "framer-motion";

import './styles.css';

interface IMovie {
    id: string;
    title: string;
    backdrop_path: string;
    genre_ids: number[];
}

const defaultActiveGenre: number = 9999999999; //all movies genres

export function ListMovies() {

    const [movies, setMovies] = useState([]);
    const [filtered, setFiltered] = useState<IMovie[]>([]);
    const [activeGenre, setActiveGenre] = useState<number>(defaultActiveGenre);

    async function fetchMovies()  {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=33c078efd0f7a6d99bacc61bd6c565de&language=en-US&page=1')

        const movies = await data.json()

        setMovies(movies.results)
        setFiltered(movies.results)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <>
            <Filter 
                movies={movies} 
                setFiltered={setFiltered} 
                activeGenre={activeGenre} 
                setActiveGenre={setActiveGenre}  
            />
            <motion.div 
                layout
                className="movies-list"
            >
                <AnimatePresence>
                    {filtered.map((movie: IMovie) => {
                        return <CardMovie key={movie.id} movie={movie}/>
                    })}
                </AnimatePresence>
            </motion.div>
        </>

    );
}