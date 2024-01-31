import { Link } from "react-router-dom";

const genreButtons: string[] = ['action', 'drama', 'fantasy', 'suspense',
  'romance', 'adventure', 'comedy', 'school', 'sports', 'psychological', 'supernatural', 'music'];

export const GenreButton = ({ userId }: { userId: string | undefined }) => {
  return (
    <div className="genres-options__buttons">
      {genreButtons.map((button: string, index: number) => (
        <Link to={`/genre/${userId}/${button}`} key={index} className="options__btn">{button}</Link>
      ))}
    </div>

  )
}