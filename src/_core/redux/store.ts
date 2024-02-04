import { configureStore } from '@reduxjs/toolkit'
import testsTableSlice from './tests-table/tests-table-slice'

export const store = configureStore({
    reducer: {
        testsTable: testsTableSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
