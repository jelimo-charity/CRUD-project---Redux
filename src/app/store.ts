import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { booksAPI } from "../features/books/booksAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Configure books persist
const persistConfig = {
    key: 'books',
    storage,
};

// Combine all reducers
const rootReducer = combineReducers({
    [booksAPI.reducerPath]: booksAPI.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore these paths in the state
                ignoredPaths: ['register'],
            },
        }).concat(booksAPI.middleware),
});

// Persist the store
export const persistedStore = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
