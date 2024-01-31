import { Header } from "../pgcomponents/Header";
import { Footer } from "../pgcomponents/Footer";
import '../searchListPage/style8.css';
import { SearchAnime } from "./components/SearchAnime";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import * as Interfaces from "../types";
import axios from "axios";

export const SearchList = () => {
  const { titles, user } = useParams();
  const [searchValue, setSearchValue] = useState<Interfaces.IAnimeData[]>([]);

  useEffect(() => {
    if (titles !== undefined) {
      const decodedSearch = decodeURIComponent(titles);

      const getSearchValue = async () => {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${decodedSearch}`);
          const filteredData = response.data.data.map((anime: Interfaces.IResponseData) => ({
            id: anime.mal_id,
            title: anime.title_english,
            score: anime.score,
            image: anime.images.jpg.large_image_url,
          }));
          setSearchValue(filteredData);
        } catch (error) {
          console.log(error);
        }
      };

      getSearchValue();
    }
  }, [titles]);

  return (
    <div className="search-list-container">
      <div className="search-list-inner__container">
        <Header userId={user} />

        <div className="search-main">
          <div className="search-main__container">
            <div className="search-anime-list">
              <div className="search-anime-list__container">

                {searchValue.map((anime: Interfaces.IAnimeData, index: number) => (
                  <SearchAnime
                    key={index}
                    userId={user}
                    id={anime.id}
                    title={anime.title}
                    score={anime.score}
                    image={anime.image}

                  />
                )).sort((a: React.ReactElement<Interfaces.IAnimeData>, b: React.ReactElement<Interfaces.IAnimeData>) => {
                  const scoreA = a.props.score || 0;
                  const scoreB = b.props.score || 0;
                  return scoreB - scoreA;
                })}

              </div>
            </div>

            <div className="search-main__caption">this is all we have</div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}