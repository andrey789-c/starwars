import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import favouriteSlice from "./reducers/favouriteSlice";

const rootReducer = combineReducers({
    favouriteSlice: favouriteSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']