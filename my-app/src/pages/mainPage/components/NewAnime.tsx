import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IExtendedAnimeData } from '../../types';
import axios from "axios";

export const NewAnime = ({ id, title, jptitle, year, status, score, image, userId }: IExtendedAnimeData) => {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    useEffect(() => {
        const checkAnimeSaves = async () => {
            try {
                const savedAnimeResult = await axios.post(`https://anisup-beta.onrender.com/check-anime-nav/${userId}/${id}`);
                setIsBookmarked(savedAnimeResult.data.isSaved);
            } catch (error) {
                console.error(error);
            }
        };

        checkAnimeSaves();
    }, [userId]);

    const toggleBookmark = async () => {
        try {
            const result = await axios.post(`https://anisup-beta.onrender.com/save-anime/${userId}/${id}`);

            if (result.data.success) {
                setIsBookmarked((prevState: boolean) => !prevState);
            } else {
                console.error('Error saving anime:', result.data.error);
            }
        } catch (error) {
            console.error('Error saving anime:', error);
        }

    };

    const displayedScore = score !== null ? score : "not rated";
    const displayedRelease = year !== null ? year : "unknown"

    return (
        <div className="anime__container">
            <Link to={`/anime/${userId}/${id}`} className="anime__image">
                <img src={image} alt="banner" />
            </Link>

            <div className="anime__info">
                <div>
                    <p className="anime__name">{title}</p>
                    <p className="anime__jpname">{jptitle}</p>
                </div>

                <div>
                    <p className="anime__release">Release: {displayedRelease}</p>
                    <p className="anime__status">Status: <span>{status}</span></p>
                    <p className="anime__rating">
                        <i className="fa-solid fa-star"></i>
                        {displayedScore}
                    </p>
                </div>

                <button className="anime__save-btn" onClick={toggleBookmark}>
                    <i className={isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                </button>
            </div>
        </div>
    )
}