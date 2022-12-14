import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IPersonParams } from '../../data/IPersonParams';
import { getId, getPeopleImage } from '../../utils/getImage';
import './index.css'

interface ListPersonsProps {
    persons: IPersonParams[]
}

const ListPersons: FC<ListPersonsProps> = ({persons}) => {
    return (
        <div className='persons'>
            <div className="container">
                <h1 className='persons__title'>Персонажи:</h1>
                <div className="persons__list">
                    {persons.map(person => (
                        <Link to={`/person/${getId(person.url, 'people')}`} key={person.url} className='person'>
                            <div className="person__block-img">
                                <img className='person__img' src={getPeopleImage(getId(person.url, 'people'))} alt="" />
                                <div className="person__hover">
                                    <div className="person__characteristic">
                                        {person.height} sm, {person.mass} kg
                                    </div>
                                </div>
                            </div>
                            <div className='person__title'>{person.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ListPersons