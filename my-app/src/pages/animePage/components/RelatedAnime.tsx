import { Link } from "react-router-dom";

interface RelatedAnimeProps {
    id: number;
    title: string;
    image: string;
    userId: string | undefined;
}
export const RelatedAnime = ({ id, title, image, userId }: RelatedAnimeProps) => {
    return (
        <div className="relations-anime__anime-content">
            <Link to={`/anime/${userId}/${id}`} className="relations-anime__image">
                <img src={image} alt="banner" />

                <div className="relations-anime__score">
                    <i className="fa-solid fa-star"></i>
                    <span>1.0</span>
                </div>
            </Link>

            <div className="relations-anime__name">{title}</div>
        </div>
    )
}