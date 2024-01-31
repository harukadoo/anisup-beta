import '../genrePage/style10.css';
import { Header } from "../pgcomponents/Header";
import { Footer } from '../pgcomponents/Footer';
import { Genre } from './components/Genre';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as Interfaces from '../types';
import axios from "axios";

interface IGenreList extends Interfaces.IAnimeData {
    genres: string[];
}

export const GenrePage = () => {
    const { genre, user } = useParams();
    const [genreList, setGenreList] = useState<IGenreList[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getGenreList = async () => {
        try {
            if (genreList.length >= 200) {
                return;
            }

            const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
            const filteredData = response.data.data
                .map((anime: Interfaces.IResponseData) => ({
                    id: anime.mal_id,
                    genres: anime.genres ? anime.genres.map((genre: Interfaces.IGenre) => {
                        return genre.name
                    }).filter((name: string) => genre && name.toLowerCase().includes(genre)) : [],

                    title: anime.title_english || anime.title,
                    score: anime.score,
                    image: anime.images.jpg.large_image_url,
                }))
                .filter((data: any) => data.genres.length > 0)

            setGenreList((prevList) => [...prevList, ...filteredData]);

            if (filteredData.length < 25 && genreList.length + filteredData.length < 200) {
                setTimeout(() => setCurrentPage(prevPage => prevPage + 1), 1000);
            }

        } catch (error) {
            console.error('Помилка при запиті до API:', error);
        }
    }

    useEffect(() => {
        getGenreList()
    }, [currentPage])

    return (
        <div className="genre-container">
            <div className="genre-inner__container">
                <Header userId={user} />

                <main className="genre-main">
                    <div className="genre-main__container">
                        <div className="genre-main-title">
                            <div className="genre-main-title__container">
                                <span></span>

                                <div className="genre-main-title__title">Anime-{genre}</div>
                            </div>
                        </div>

                        <div className="genre-main-content">
                            <div className="genre-main-content__container">
                                <div className="genre-anime-list">
                                    <div className="genre-anime-list__container">
                                        {genreList.map((anime: Interfaces.IAnimeData, index: number) => (
                                            <Genre
                                                key={index}
                                                id={anime.id}
                                                title={anime.title}
                                                score={anime.score}
                                                image={anime.image}
                                                userId={user}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="genre-loading-caption" style={{ display: genreList.length === 0 ? 'block' : 'none' }}>
                    <p>Loading...</p>
                </div>

                <Footer />
            </div>
        </div>
    )
}