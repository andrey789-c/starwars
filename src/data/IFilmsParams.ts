export interface IFilmParams {
    title: string;
    episode_id: number;
    director: string;
    opening_crawl: string;
    url: string;
    characters: string[]
}

export interface IFilms {
    results: IFilmParams[]
}