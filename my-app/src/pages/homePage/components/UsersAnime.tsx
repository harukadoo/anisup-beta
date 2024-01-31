import { Link } from "react-router-dom";

interface SavedAnimeProps {
    userId: string | undefined;
    id: number;
    title: string;
    score: number | null;
    image: string;
}

export const UsersAnime = ({ userId, id, title, score, image }: SavedAnimeProps) => {
    return (
        <div className="users-anime__anime">
            <Link to={`/anime/${userId}/${id}`} className="users-anime__image">
                <img src={image} alt="banner" />

                <div className="users-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>{score}</span>
                </div>
            </Link>

            <div className="users-anime__name">{title}</div>
        </div>
    )
}