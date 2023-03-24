import { configureStore } from '@reduxjs/toolkit';
import cardReducer from "./utils/cardSlice"

export const store = configureStore({
    reducer: {
        card: cardReducer,
    },
});