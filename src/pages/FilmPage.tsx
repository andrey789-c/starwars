import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IFilmParams } from '../data/IFilmsParams'
import { IPersonParams } from '../data/IPersonParams'
import { getFilmImage, getId, getPeopleImage } from '../utils/getImage'
import { to_roman } from '../utils/toRoman'

const FilmPage = () => {

    const {id} = useParams()
    const [film, setFilm] = useState<IFilmParams | null>(null)
    const [persons, setPersons] = useState<IPersonParams[]>([])

    const [isLoading, setIsloading] = useState(true)

    const fetchFilm = async () => {
        const personsArray: IPersonParams[] = []
        const resFilm = await axios.get<IFilmParams>(`https://swapi.dev/api/films/${id}/`)   
        resFilm.data.characters.map(async(person) => {
            const resPersons = await axios.get<IPersonParams>(person)
            if(personsArray.length <= 10) {
                personsArray.push(resPersons.data)
                setPersons([...persons, ...personsArray])
            }
            
        })
        setFilm(resFilm.data)
        setIsloading(false)
    }

    useEffect(() => {
        fetchFilm()
    }, [])

    return (
        <div className="wrapper">
            <div className='container'>
                {isLoading && <Circles 
                    color="#ffe926"
                    ariaLabel="circles-loading"
                    wrapperClass='circles-loading' />}
                {film && (
                    <div className='block'>
                        <div className="block__right">
                            <img src={getFilmImage(getId(film.url, 'films'))} alt="" />
                        </div>
                        <div className="block__left">
                            <div className="block__name">Star wars: Episode {to_roman(film.episode_id)} - {film.title}</div>
                            <div className="block__gender">Director: {film.director}</div>
                            <div className="block__description">
                                {film.opening_crawl}
                            </div>
                            <div className="block__films">
                                <div className="block__films-title">Персонажи:</div>
                                {persons.map(person => (
                                    <Link to={`/person/${getId(person.url, 'people')}`} className='block__film'>{person.name}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
    )
}
export default FilmPage