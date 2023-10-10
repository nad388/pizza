import { configureStore } from '@reduxjs/toolkit'
import cart from './slices/cartSlice.ts'
import filter from './slices/filterSlice.ts'

export const store = configureStore({
	reducer: { filter, cart }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
