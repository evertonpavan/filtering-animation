// import './style.css';
import { motion } from "framer-motion";

interface IMovie {
        id: string;
        title: string;
        backdrop_path: string;
}

export default function CardMovie({movie}: {movie: IMovie}) {

    return (
        <>
         <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0}}
            exit={{ opacity: 0 }}
            layout
        >
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
        </motion.div>
        </>
       
    );
}