import { Link } from "react-router-dom";

interface RecommendedProps {
    id: number;
    title: string;
    image: string;
    userId: string | undefined;
}

export const Recommended = ({ id, title, image, userId }: RecommendedProps) => {
    return (
        <div className="recommendations__content">
            <Link to={`/anime/${userId}/${id}`} className="recommendations__img">
                <img src={image} alt="banner" />
            </Link>
            <p className="recommendations__title">{title}</p>
        </div>
    )
}
