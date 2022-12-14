import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { IFilmParams, IFilms } from '../data/IFilmsParams'
import { getFilmImage, getId } from '../utils/getImage'
import { to_roman } from '../utils/toRoman'

const FilmsPage = () => {
    const [films, setFilms] = useState<IFilmParams[]>([])

    const fetchFilms = async () => {
        const res = await axios.get<IFilms>('https://swapi.dev/api/films/')
        
        setFilms(res.data.results.sort((a, b) => a.episode_id - b.episode_id))
    }

    useEffect(() => {
        fetchFilms()
    }, [])

    return (
        <div className='persons'>
            <div className="container">
                {!films.length 
                    ?
                    <Circles 
                        color="#ffe926"
                        ariaLabel="circles-loading"
                        wrapperClass='circles-loading' />
                    :
                    (
                        <>
                            <h1 className='persons__title'>Фильмы:</h1>
                            <div className="persons__list">
                                {films.map(film => (
                                    <Link to={`/film/${getId(film.url, 'films')}`} key={film.url} className='person'>
                                    <div className="person__block-img">
                                        <img className='person__img' src={getFilmImage(getId(film.url, 'films'))} alt="" />
                                        <div className="person__hover">
                                            <div className="person__characteristic">
                                                Director: {film.director}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='person__title'>Star wars: Episode {to_roman(film.episode_id)}</div>
                                </Link>
                                ))}
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
        
        
    )
}
export default FilmsPage