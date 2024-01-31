export interface IAnimeData extends Pick<IFullAnimeData, 'title' | 'image' | 'score'> {
  userId?: string | undefined;
  id: number;
}
export interface IExtendedAnimeData extends IAnimeData {
  jptitle: string;
  year: number;
  status: string;
}

export interface IFullAnimeData {
  title: string;
  jptitle: string;
  year: number;
  genres: string[];
  rating: number;
  episodes: number;
  duration: string;
  status: string;
  score: number | null;
  favorites: number;
  scored_by: number;
  about: string;
  trailer: string;
  trailerBanner: string;
  image: string;
}

export interface IGenre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface IResponseData {
  mal_id: number;
  title?: string;
  title_english: string;
  title_japanese?: string;
  genres?: {
    mal_id: number
    type: string
    name: string
    url: string
  }[];
  year?: number;
  status?: string;
  score: number | null;
  trailer?: {
    url: string;
  }
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}
