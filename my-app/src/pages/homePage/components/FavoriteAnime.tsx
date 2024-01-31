import { UsersAnime } from "./UsersAnime";
import { useEffect } from "react";
import * as Interfaces from "../../types";
import axios from 'axios';

interface IFavoriteAnime {
    user: string | undefined;
    favAnime: string[];
    setFavAnime: React.Dispatch<React.SetStateAction<string[]>>;
    favAnimeDetails: Interfaces.IAnimeData[];
    setFavAnimeDetails: React.Dispatch<React.SetStateAction<Interfaces.IAnimeData[]>>;
}

export const FavoriteAnime = ({ user, favAnime, setFavAnime, favAnimeDetails, setFavAnimeDetails }: IFavoriteAnime) => {
    useEffect(() => {
        const getFavAnimeData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3001/get-fav-anime/${user}`);
                const userData = userResponse.data;

                if (userData.success) {
                    setFavAnime(userData.favAnimeIds);
                } else {
                    console.error('Помилка при запиті до сервера:', userData.error);
                }
            } catch (error) {
                console.error('Помилка при запиті до сервера:', error);
            }
        };

        getFavAnimeData();
    }, [user]);

    useEffect(() => {
        const getFavAnimeDetails = async () => {
            try {
                const favAnimeData = [];
                for (const animeId of favAnime) {
                    try {
                        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
                        favAnimeData.push(response.data.data);
                        
                    } catch (error) {
                        console.error('Помилка при запиті до API:', error);
                    }
                }

                const filteredData = favAnimeData.map((anime: Interfaces.IResponseData) => ({
                    id: anime.mal_id,
                    title: anime.title_english,
                    score: anime.score,
                    image: anime.images.jpg.large_image_url,
                  }));
                setFavAnimeDetails(filteredData);
            } catch (error) {
                console.error('Помилка при запиті до API:', error);
            }
        };

        if (favAnime.length > 0) {
            getFavAnimeDetails();
        }

    }, [favAnime]);

    return (
        <div className="user-actions-liked">
            <div className="user-actions-liked__container">
                <div className="actions-liked__title">
                    <i className="fa-solid fa-heart"></i>
                    <div className="actions-liked__title-title">Favorite ({favAnimeDetails.length})</div>
                </div>

                <div className="actions-fav-anime">
                    <div className="actions-fav-anime__container">
                        <div className="users-anime">
                            {favAnimeDetails.map((anime: Interfaces.IAnimeData, index: number) => (
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