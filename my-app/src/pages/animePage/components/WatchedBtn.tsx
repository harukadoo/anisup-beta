import axios from "axios";

interface IWatchedBtn {
    userId: string | undefined;
    animeId: string | undefined;
    isWatched: boolean;
    setIsWatched: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WatchedBtn = ({ userId, animeId, isWatched, setIsWatched }: IWatchedBtn) => {
    const toggleIsWatched = async () => {
        try{
            const result = await axios.post(`https://anisup-beta.onrender.com/watched-anime/${userId}/${animeId}`);

            if (result.data.success) {
                setIsWatched((prevIsWatched: boolean) => !prevIsWatched);
            } else {
                console.error('Error saving anime:', result.data.error);
            }
        } catch (error) {
            console.error('Error saving anime:', error);
        }
    };

    return (
        <div className="anime-info__watched-btn">
            <abbr title="watched">
                <button onClick={toggleIsWatched}>
                    <i className={isWatched ? "fa-solid fa-check-double" : "fa-solid fa-check"}></i>
                </button>
            </abbr>

        </div>
    )
}