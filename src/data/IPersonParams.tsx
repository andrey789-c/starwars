export interface IPersonParams {
    name: string;
    img: string;
    films: string[];
    homeworld: string;
    gender: string;
    mass: number;
    height: number;
    url: string;
    next: string | null;
    previous: string | null;
}

export interface IPersons {
    count: number;
    next: string;
    previous: string;
    results: IPersonParams[]
}