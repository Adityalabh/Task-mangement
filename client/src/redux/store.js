// import {configureStore} from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";
// 
// const store = configureStore({
//     reducer:{
//         user:userSlice,
//         task:taskSlice
//     }
// });
// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice.js';
import taskSlice from "./taskSlice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 2,
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    task: taskSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;