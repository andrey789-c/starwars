import React from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ListPersons from '../components/ListPersons/ListPersons';
import { useAppSelector } from '../hooks/redux';

import '../styles/FavouritePage.css'

const FavouritePage = () => {

    const {persons} = useAppSelector(state => state.favouriteSlice)

    return (
        <div>
            {persons.length 
                ? 
                    <ListPersons persons={persons}/>
                :
                <div className='empty'>У вас нет любимых персонажей :(</div>
            }
        </div>
        
    )
}
export default FavouritePage