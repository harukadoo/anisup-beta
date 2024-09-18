import '../top100Page/style7.css';
import { Header } from '../pgcomponents/Header';
import { Footer } from '../pgcomponents/Footer';
import { useParams } from "react-router-dom";
import { TopAnime } from './components/TopAnime';
import { useState, useEffect } from "react";
import * as Interfaces from "../types";
import axios from "axios";

export const TopAnimePage = () => {
    const { user } = useParams();
    const [topAnime, setTopAnime] = useState<Interfaces.IAnimeData[]>([]);
    const [page, setPage] = useState<number>(1)

    function addPage() {
        if (page < 4) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                axios.get(`https://api.jikan.moe/v4/top/anime?type=tv&movie&page=${nextPage}`)
                    .then(response => {
                        const filteredData = response.data.data.map((anime: Interfaces.IResponseData) => ({
                            id: anime.mal_id,
                            title: anime.title_english,
                            score: anime.score,
                            image: anime.images.jpg.large_image_url,
                        }));
                        setTopAnime(prevAnime => [...prevAnime, ...filteredData]);
                    })
                    .catch(error => console.error('Помилка при запиті до API:', error));

                return nextPage;
            });
        }
    }

    const getTopAnime = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/top/anime?type=tv&movie&page=${page}`);
            const filteredData = response.data.data.map((anime: Interfaces.IResponseData) => ({
                id: anime.mal_id,
                title: anime.title_english,
                score: anime.score,
                image: anime.images.jpg.large_image_url,
            }));
            setTopAnime(filteredData);
        } catch (error) {
            console.error('Помилка при запиті до API:', error);
        }
    }

    useEffect(() => {
        getTopAnime()
    }, []);

    useEffect(() => {
        console.log(topAnime);

    }, [topAnime]);

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user} />

                <main className="main">
                    <div className="main__container">
                        <div className="main-background__container"></div>


                        <div className="main-content">
                            <div className="main-content__container">
                                <div className="top-anime-main-content">
                                    <div className="top-anime-main-content__container">

                                        <div className="main-title">
                                            <div className="main-title__container">
                                                Top 100
                                            </div>
                                        </div>

                                        <div className="top-anime-top">
                                            <div className="top-anime-top__container">
                                                {topAnime.map((anime: Interfaces.IAnimeData, index: number) => (
                                                    <TopAnime
                                                        key={index}
                                                        userId={user}
                                                        id={anime.id}
                                                        title={anime.title}
                                                        score={anime.score}
                                                        image={anime.image}
                                                    />
                                                ))}

                                            </div>
                                        </div>

                                        <button onClick={addPage} className="top-anime-main__btn" style={{ display: page === 4 ? 'none' : 'block' }}>
                                            <i className="fa-solid fa-angles-down"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}