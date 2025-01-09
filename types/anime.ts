export interface AnimeTitle {
  userPreferred: string;
  english: string;
  romaji: string;
}

export interface AnimeResult {
  id: string;
  title: AnimeTitle;
  image: string;
  type: string;
  releaseDate: string;
}
