import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonParams } from "../../data/IPersonParams";

interface FavouritePersonState {
    persons: IPersonParams[]
}

const initialState: FavouritePersonState = {
    persons: []
}

const favouritePersonSlice = createSlice({
    name: 'favouritePerson',
    initialState,
    reducers: {
        addPredictions(state, action: PayloadAction<IPersonParams>) {
            state.persons = [...state.persons, action.payload]
        },
        removePredictions(state, action) {
            state.persons = [...state.persons.filter(person => person.name !== action.payload.name)]
        }
    }    
})

export default favouritePersonSlice