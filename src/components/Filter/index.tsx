import { useEffect, useState } from 'react';
import './styles.css'

interface IMovie {
    id: string;
    title: string;
    backdrop_path: string;
    genre_ids: number[];
}

interface IFilterProps {
    movies: IMovie[];
    setFiltered: (movies: IMovie[]) => void;
    activeGenre: number;
    setActiveGenre: (activeGenre: number) => void;
}

interface IGenre {
    id: string;
    name: string;
}

const defaultActiveGenre: number = 9999999999; //all movies genres


export default function Filter({ 
    movies, 
    setFiltered,
    activeGenre,
    setActiveGenre 
}: IFilterProps) {

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState<number>(defaultActiveGenre);

    async function fetchGenres()  {
        const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=33c078efd0f7a6d99bacc61bd6c565de&language=en-US')

        const genres = await data.json()

        setGenres(genres.genres)
    }

    useEffect(() => {
        fetchGenres()
    }, [])

    useEffect(() => {

        if (activeGenre === 9999999999) {
            setFiltered(movies);
            return;
        }

        const filtered = movies.filter(movie => 
            movie.genre_ids.includes(activeGenre)
        );

        setFiltered(filtered);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeGenre])

    
    return (
        <div className="filter-container">
            
            <p>Select a genre: </p>
            <select
                onChange={e => setSelectedGenre(Number(e.target.value))}

            >
                <option key={9999999999} value={9999999999}>All</option>
                {genres.map((genre: IGenre) => {
                    return <option key={genre.id} value={genre.id}>{genre.name}</option>
                })}
            </select>
            <button 
                className=""
                onClick={() => setActiveGenre(selectedGenre)}
            >
                Apply
            </button>
        </div>
    )
}