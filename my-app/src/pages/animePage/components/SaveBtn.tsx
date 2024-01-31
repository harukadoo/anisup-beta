import { useEffect } from "react";
import { IFullAnimeData } from "../../types";
import axios from "axios";

interface ISaveBtn {
    usersSaves: number;
    animeData: IFullAnimeData[];
    userId: string | undefined;
    animeId: string | undefined;
    isBookmarked: boolean;
    setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
    saves: number;
    setSaves: React.Dispatch<React.SetStateAction<number>>;
}

export const SaveBtn = ({ usersSaves, animeData, userId, animeId, isBookmarked, setIsBookmarked, saves, setSaves }: ISaveBtn) => {
    useEffect(() => {
        if (animeData.length > 0) {
            setSaves(usersSaves);
        }
    }, [animeData]);

    const toggleBookmark = async () => {
        try {
            const result = await axios.post(`https://anisup-beta.onrender.com/save-anime/${userId}/${animeId}`);
    
            if (result.data.success) {
                setIsBookmarked((prevState: boolean) => !prevState);
    
                setSaves((prevSaves: number) => {
                    return isBookmarked ? prevSaves - 1 : prevSaves + 1;
                });
            } else {
                console.error('Error saving anime:', result.data.error);
            }
        } catch (error) {
            console.error('Error saving anime:', error);
        }
    };
    
    return (
        <div className="anime-info__save-btn">
            <button onClick={toggleBookmark}>
                <i className={isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
            </button>
            <span>{animeData.length > 0 ? saves : ''}</span>
        </div>
    )
}