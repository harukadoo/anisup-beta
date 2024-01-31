import { useEffect } from "react";
import { IFullAnimeData } from "../../types";
import axios from "axios";

interface ILikeBtn {
    usersLikes: number;
    animeData: IFullAnimeData[];
    userId: string | undefined;
    animeId: string | undefined;
    isLiked: boolean;
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
    likes: number;
    setLikes: React.Dispatch<React.SetStateAction<number>>;
}

export const LikeBtn = ({ usersLikes, animeData, userId, animeId, isLiked, setIsLiked, likes, setLikes }: ILikeBtn) => {
    useEffect(() => {
        if (animeData.length > 0) {
            setLikes(usersLikes);
        }
    }, [animeData]);

    const toggleLikes = async () => {
        try {
            const result = await axios.post(`https://anisup-beta.onrender.com/like-anime/${userId}/${animeId}`);
            if (result.data.success) {
                setIsLiked((prevState: boolean) => !prevState);

                setLikes((prevLikes: number) => {
                    return isLiked ? prevLikes - 1 : prevLikes + 1;
                });
            } else {
                console.error('Error saving anime:', result.data.error);
            }
        } catch (error) {
            console.error('Error saving anime:', error);
        }
    };
    
    return (
        <div className="anime-info__like-btn">
            <button onClick={toggleLikes}>
                <i className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
            <span>{animeData.length > 0 ? likes : ''}</span>
        </div>
    )
}