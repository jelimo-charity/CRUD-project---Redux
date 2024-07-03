import {persistStore, persistReducer} from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { booksAPI } from "../features/books/booksAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

//configure books persist

const persistConfig = {
    key: 'books',
    storage,
}

//combine all reducers

const rootReducer = combineReducers({
    [booksAPI.reducerPath]: booksAPI.reducer
});

//create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//configure the store

export const store =  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksAPI.middleware)
})

//persist the store
export const persistedStore = persistStore(store);
// do the export

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch