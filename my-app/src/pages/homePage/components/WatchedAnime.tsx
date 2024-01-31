import { UsersAnime } from "./UsersAnime";
import { useEffect } from "react";
import * as Interfaces from "../../types";
import axios from 'axios';

interface IWatchedAnime {
    user: string | undefined;
    watchedAnime: string[];
    setWatchedAnime: React.Dispatch<React.SetStateAction<string[]>>;
    watchedAnimeDetails: Interfaces.IAnimeData[];
    setWatchedAnimeDetails: React.Dispatch<React.SetStateAction<Interfaces.IAnimeData[]>>;
}

export const WatchedAnime = ({ user, watchedAnime, setWatchedAnime, watchedAnimeDetails, setWatchedAnimeDetails }: IWatchedAnime) => {
    useEffect(() => {
        const getWatchedAnimeData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/get-watched-anime/${user}`);
                const userData = userResponse.data;

                if (userData.success) {
                    setWatchedAnime(userData.watchedAnimeIds);
                } else {
                    console.error('Помилка при запиті до сервера:', userData.error);
                }
            } catch (error) {
                console.error('Помилка при запиті до сервера:', error);
            }
        };

        getWatchedAnimeData();
    }, [user]);

    useEffect(() => {
        const getFavAnimeDetails = async () => {
            try {
                const watchedAnimeData = [];
                for (const animeId of watchedAnime) {
                    try {
                        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
                        watchedAnimeData.push(response.data.data);
                    } catch (error) {
                        console.error('Помилка при запиті до API:', error);
                    }
                }

                const filteredData = watchedAnimeData.map((anime: Interfaces.IResponseData) => ({
                    id: anime.mal_id,
                    title: anime.title_english,
                    score: anime.score,
                    image: anime.images.jpg.large_image_url,
                }));
                setWatchedAnimeDetails(filteredData);
            } catch (error) {
                console.error('Помилка при запиті до API:', error);
            }
        };

        if (watchedAnime.length > 0) {
            getFavAnimeDetails();
        }

    }, [watchedAnime]);

    return (
        <div className="user-actions-watched">
            <div className="user-actions-watched__container">
                <div className="actions-watched__title">
                    <i className="fa-solid fa-check-double"></i>
                    <div className="actions-watched__title-title">Watched ({watchedAnimeDetails.length})</div>
                </div>

                <div className="actions-watched-anime">
                    <div className="actions-watched-anime__container">
                        <div className="users-anime">
                            {watchedAnimeDetails.map((anime: Interfaces.IAnimeData, index: number) => (
                                <UsersAnime
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
                </div>
            </div>
        </div>
    )
}