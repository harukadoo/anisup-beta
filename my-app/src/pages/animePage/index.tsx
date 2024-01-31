import { Header } from "../pgcomponents/Header";
import { Footer } from "../pgcomponents/Footer";
import { RelatedAnime } from "./components/RelatedAnime";
import { LikeBtn } from "./components/LikeBtn";
import { SaveBtn } from "./components/SaveBtn";
import { WatchedBtn } from "./components/WatchedBtn";
import '../animePage/style6.css';
import * as Interfaces from '../types';

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface IRelationsData {
    entry: {
        mal_id: number;
        title: string;
        images: {
            jpg: {
                large_image_url: string;
            }
        }
    }
}

export const AnimePage = () => {
    const { user, id } = useParams();
    const [animeData, setAnimeData] = useState<Interfaces.IFullAnimeData[]>([]);
    const [animeRelations, setAnimeRelations] = useState<IRelationsData[]>([]);

    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [saves, setSaves] = useState<number>(0);

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);

    const [isWatched, setIsWatched] = useState(false);

    const getAnimeData = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);

            const anime = response.data.data;

            const filteredData: Interfaces.IFullAnimeData = {
                title: anime.title_english || anime.title,
                jptitle: anime.title_japanese,
                year: anime.year,
                genres: anime.genres.map((genre: Interfaces.IGenre) => {
                    return genre.name
                }),
                rating: anime.rating,
                episodes: anime.episodes,
                duration: anime.duration,
                status: anime.status,
                score: anime.score,
                favorites: anime.favorites,
                scored_by: anime.scored_by,
                image: anime.images.jpg.large_image_url,
                about: anime.synopsis,
                trailer: anime.trailer.url,
                trailerBanner: anime.trailer.images.maximum_image_url || anime.trailer.images.large_image_url,
            }
            setAnimeData([filteredData]);

        } catch (error) {
            console.error(error);

        }
    }

    const getAnimeRelations = async () => {
        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
            setAnimeRelations(response.data.data);

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        const checkAnimeNav = async () => {
            try {
                const savedAnimeResult = await axios.post(`https://anisup-beta.onrender.com/check-anime-nav/${user}/${id}`);
                setIsBookmarked(savedAnimeResult.data.isSaved);
                setIsLiked(savedAnimeResult.data.isLiked);
                setIsWatched(savedAnimeResult.data.isWatched);
            } catch (error) {
                console.error(error);
            }
        };

        checkAnimeNav();
    }, [user, id]);

    useEffect(() => {
        getAnimeData();
        getAnimeRelations();
    }, [user, id]);

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user} />

                <main className="anime-main">
                    <div className="anime-main__container">
                        <div className="anime-main__content">
                            <div className="anime-info">
                                <div className="anime-info__container">
                                    <div className="anime-info__image">
                                        <img src={animeData.length > 0 ? animeData[0].image : ''} alt="banner" />
                                    </div>

                                    <div className="anime-info__description">
                                        <div>
                                            <p className="anime-info__name">{animeData.length > 0 ? animeData[0].title : ''}</p>

                                            <p className="anime-info__jpname">{animeData.length > 0 ? animeData[0].jptitle : ''}</p>
                                        </div>

                                        <div className="anime-info__full-info">
                                            <p className="anime-info__release">
                                                Release: <span>{animeData.length > 0 ? animeData[0].year : ''}</span>
                                            </p>

                                            <p className="anime-info__genres">
                                                Genres:
                                                <span>{animeData.length > 0
                                                    ? animeData[0].genres.map((genre: string) => genre.toLowerCase()).join(', ')
                                                    : ''}</span>
                                            </p>

                                            <p className="anime-info__rating">
                                                Rating: <span>{animeData.length > 0 ? animeData[0].rating : ''}</span>
                                            </p>

                                            <p className="anime-info__episodes">
                                                Episodes: <span>{animeData.length > 0 ? animeData[0].episodes : ''}</span>
                                            </p>

                                            <p className="anime-info__duration">
                                                Duration: <span>{animeData.length > 0 ? animeData[0].duration : ''}</span>
                                            </p>

                                            <p className="anime-info__status">
                                                Status: <span>{animeData.length > 0 ? animeData[0].status : ''}</span>
                                            </p>
                                        </div>

                                        <div className="anime-info__nav">
                                            <p className="anime-info__rank">
                                                <i className="fa-solid fa-star"></i>
                                                <span>{animeData.length > 0 ? animeData[0].score : ''}</span>
                                            </p>

                                            <LikeBtn
                                                usersLikes={animeData.length > 0 ? animeData[0].favorites : 0}
                                                animeData={animeData}
                                                userId={user}
                                                animeId={id}
                                                isLiked={isLiked}
                                                setIsLiked={setIsLiked}
                                                likes={likes}
                                                setLikes={setLikes}
                                            />

                                            <SaveBtn
                                                usersSaves={animeData.length > 0 ? animeData[0].scored_by : 0}
                                                animeData={animeData}
                                                userId={user}
                                                animeId={id}
                                                isBookmarked={isBookmarked}
                                                setIsBookmarked={setIsBookmarked}
                                                saves={saves}
                                                setSaves={setSaves}
                                            />

                                            <WatchedBtn
                                                userId={user}
                                                animeId={id}
                                                isWatched={isWatched}
                                                setIsWatched={setIsWatched}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="anime-main-about">
                                <div className="anime-main-about__container">
                                    <div className="anime-main-about__title">About the title:</div>

                                    <div className="anime-main-about__description">
                                        {animeData.length > 0 ? animeData[0].about : ''}

                                    </div>
                                </div>
                            </div>

                            <div className="anime-main-trailer">
                                <div className="anime-main-trailer__container">


                                    <a className="anime-main-trailer__trailer" href={animeData.length > 0 ? animeData[0].trailer : ''}>
                                        <img src={animeData.length > 0 ? animeData[0].trailerBanner : ''} alt="treiler-preview-img" />
                                    </a>

                                </div>
                            </div>


                            <div className="anime-main-relations">
                                <div className="anime-main-relations__container">
                                    <div className="anime-main-relations__title">Similar anime titles:</div>

                                    <div className="relations-anime">
                                        <div className="relations-anime__container">
                                            <div className="relations-anime__anime">
                                                {animeRelations.map((anime: IRelationsData, index: number) => (
                                                    <RelatedAnime 
                                                        key={index}
                                                        id={anime.entry.mal_id}
                                                        title={anime.entry.title}
                                                        image={anime.entry.images.jpg.large_image_url}
                                                        userId={user}
                                                    />
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="anime-main-dub">
                                <div className="anime-main-dub__container">
                                    <span>You can watch all episodes here — </span>
                                    <a href="https://t.me/Studio_Kachur" className="dub__link">https://t.me/Studio_Kachur</a>
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