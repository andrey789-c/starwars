

export const getId = (url: string, category: string): string => {

    const id = url
        .replace(`https://swapi.dev/api/${category}`, '')
        .replace(/\//g ,'')
    return id
}

export const getPeopleImage = (id: string) => `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
export const getFilmImage = (id: string) => `https://starwars-visualguide.com/assets/img/films/${id}.jpg`