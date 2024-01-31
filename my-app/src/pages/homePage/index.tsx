import { useEffect, useState } from 'react';
import '../homePage/style9.css';
import { Header } from '../pgcomponents/Header';
import { SavedAnime } from './components/SavedAnime';
import { FavoriteAnime } from './components/FavoriteAnime';
import { WatchedAnime } from './components/WatchedAnime';
import { useParams } from "react-router-dom";
import { IAnimeData } from '../types';
import axios from 'axios';

interface UserData {
    name: string;
    email: string;
}

export const HomePage = () => {
    const { user } = useParams();
    const [userData, setUserData] = useState<UserData | null>(null);

    const [savedAnime, setSavedAnime] = useState<string[]>([]);
    const [savedAnimeDetails, setSavedAnimeDetails] = useState<IAnimeData[]>([]);

    const [favAnime, setFavAnime] = useState<string[]>([]);
    const [favAnimeDetails, setFavAnimeDetails] = useState<IAnimeData[]>([]);

    const [watchedAnime, setWatchedAnime] = useState<string[]>([]);
    const [watchedAnimeDetails, setWatchedAnimeDetails] = useState<IAnimeData[]>([]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${user}`);
                setUserData(response.data)
            } catch (error) {
                console.error('Помилка при запиті до серверу:', error);
            }
        }

        getUserData()
    }, [user])

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user} />

                <main className="home-main">
                    <div className="home-main__container">
                        <div className="home-main-banner">
                            <div className="home-main-banner__container"></div>
                        </div>


                        <div className="home-main-user-info">
                            <div className="home-main-user-info__container">
                                <span className="home-user-info__icon">
                                    <i className="fa-solid fa-user"></i>
                                </span>

                                <div className="home-user-info-info">
                                    <div className="home-user-info-info__container">
                                        <div className="user-info-info__username">{userData !== null ? userData.name : 'no username'}</div>

                                        <div className="user-info-info__email">{userData !== null ? userData.email : 'no email'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-user-actions">
                            <div className="home-user-actions__container">
                                <SavedAnime
                                    user={user}
                                    savedAnime={savedAnime}
                                    setSavedAnime={setSavedAnime}
                                    savedAnimeDetails={savedAnimeDetails}
                                    setSavedAnimeDetails={setSavedAnimeDetails}
                                />

                                <FavoriteAnime
                                    user={user}
                                    favAnime={favAnime}
                                    setFavAnime={setFavAnime}
                                    favAnimeDetails={favAnimeDetails}
                                    setFavAnimeDetails={setFavAnimeDetails}
                                />

                                <WatchedAnime
                                    user={user}
                                    watchedAnime={watchedAnime}
                                    setWatchedAnime={setWatchedAnime}
                                    watchedAnimeDetails={watchedAnimeDetails}
                                    setWatchedAnimeDetails={setWatchedAnimeDetails}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}