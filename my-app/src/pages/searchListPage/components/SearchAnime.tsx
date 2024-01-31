import { Link } from "react-router-dom";

interface SearchListProps{
    id: number;
    title: string;
    score: number | null;
    image: string;
    userId: string | undefined;
}

export const SearchAnime = ({ id, title, score, image, userId}: SearchListProps) => {
    return (
        <div className="search-anime__anime">
            <Link to={`/anime/${userId}/${id}`} className="search-anime__image">
                <img src={image} alt="banner" className="search-anime__img"/>

                <div className="search-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>{score}</span>
                </div>

            </Link>

            <div className="search-anime__name">{title}</div>
        </div>
    )
}