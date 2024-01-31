import { UsersAnime } from "./UsersAnime";
import { useEffect } from "react";
import * as Interfaces from "../../types";
import axios from 'axios';

interface ISavedAnime {
    user: string | undefined;
    savedAnime: string[];
    setSavedAnime: React.Dispatch<React.SetStateAction<string[]>>;
    savedAnimeDetails: Interfaces.IAnimeData[];
    setSavedAnimeDetails: React.Dispatch<React.SetStateAction<Interfaces.IAnimeData[]>>;
}

export const SavedAnime = ({ user, savedAnime, setSavedAnime, savedAnimeDetails, setSavedAnimeDetails }: ISavedAnime) => {
    useEffect(() => {
        const getSavedAnimeData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/get-saved-anime/${user}`);
                const userData = userResponse.data;

                if (userData.success) {
                    setSavedAnime(userData.savedAnimeIds);
                } else {
                    console.error('Помилка при запиті до сервера:', userData.error);
                }
            } catch (error) {
                console.error('Помилка при запиті до сервера:', error);
            }
        };

        getSavedAnimeData();
    }, [user]);

    useEffect(() => {
        const getSavedAnimeDetails = async () => {
            try {
                const savedAnimeData = [];
                for (const animeId of savedAnime) {
                    try {
                        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
                        savedAnimeData.push(response.data.data);
                    } catch (error) {
                        console.error('Помилка при запиті до API:', error);
                    }
                }

                const filteredData = savedAnimeData.map((anime: Interfaces.IResponseData) => ({
                    id: anime.mal_id,
                    title: anime.title_english,
                    score: anime.score,
                    image: anime.images.jpg.large_image_url,
                }));
                setSavedAnimeDetails(filteredData);
            } catch (error) {
                console.error('Помилка при запиті до API:', error);
            }
        };

        if (savedAnime.length > 0) {
            getSavedAnimeDetails();
        }
    }, [savedAnime]);

    return (
        <div className="user-actions-saved">
            <div className="user-actions-saved__container">
                <div className="actions-saved__title">
                    <i className="fa-solid fa-bookmark"></i>
                    <div className="actions-saved__title-title">Saved ({savedAnimeDetails.length})</div>
                </div>

                <div className="actions-saved-anime">
                    <div className="actions-saved-anime__container">
                        <div className="users-anime">
                            {savedAnimeDetails.map((anime: Interfaces.IAnimeData, index: number) => (
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