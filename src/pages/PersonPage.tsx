import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IFilmParams } from '../data/IFilmsParams'
import { IHomeworldParams } from '../data/IHomeworldParams'
import { IPersonParams } from '../data/IPersonParams'
import { getId, getPeopleImage } from '../utils/getImage'
import { to_roman } from '../utils/toRoman'

import '../styles/PersonPage.css'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import favouriteSlice from '../store/reducers/favouriteSlice'
import { Circles } from 'react-loader-spinner'


const PersonPage = () => {
    const {id} = useParams()
    
    const [person, setPerson] = useState<IPersonParams | null>(null)
    const [films, setFilms] = useState<IFilmParams[]>([])
    const [homeworld, setHomeworld] = useState<string>('')

    const [isLoading, setIsLoading] = useState(true)

    const [isLike, setIsLike] = useState<boolean>(false)

    const {persons} = useAppSelector(state => state.favouriteSlice)
    const dispatch = useAppDispatch()

    const fetchData = async() => {
        const filmsArray: IFilmParams[] = []
        const resPerson = await axios.get<IPersonParams>(`https://swapi.dev/api/people/${id}/`)
        resPerson.data.films.map(async film => {
            const resFilms = await axios.get<IFilmParams>(film)
            filmsArray.push(resFilms.data)
            filmsArray.sort((a, b) => a.episode_id - b.episode_id)
            setFilms([...films, ...filmsArray])
        })
        const resHomeworld = await axios.get<IHomeworldParams>(resPerson.data.homeworld)
        setHomeworld(resHomeworld.data.name)
        setPerson(resPerson.data)
        setIsLoading(false)
    }

    const like = () => {
        if(isLike) {
            if(person) {
                dispatch(favouriteSlice.actions.removePredictions(person))
                setIsLike(false)
            } 
        }else {
            if(person) {
                dispatch(favouriteSlice.actions.addPredictions(person))
                setIsLike(true)
            } 
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        persons.forEach(p => {
            console.log(p)
            if(p.name === person?.name) {
                
                setIsLike(true)
            }
        })
    }, [person])
    
    return (
        <div className='wrapper'>
            <div className="container">
                {isLoading && <Circles 
                    color="#ffe926"
                    ariaLabel="circles-loading"
                    wrapperClass='circles-loading' />}
                {person && (
                    <div className='block'>
                        <div className="block__right">
                            <img src={getPeopleImage(getId(person.url, 'people'))} alt="" />
                        </div>
                        <div className="block__left">
                            <div className="block__name">{person.name}</div>
                            <div className="block__gender">{person.gender}</div>
                            <div className="block__homeworld">{homeworld}</div>
                            <div className="block__films"> 
                                <div className="block__films-title">Фильмы:</div>
                                {films.map(film => <Link to={`/film/${getId(film.url, 'films')}`} className='block__film' key={film.episode_id}>Star wars: Episode {to_roman(film.episode_id)} - {film.title}</Link>)}
                            </div>
                        </div>
                        <div className="block__heart">
                            <button onClick={like} className={['block__btn', isLike && 'like'].join(' ')}>{isLike ? "Удалить из избранного" : "Добавить в избранное"}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default PersonPage