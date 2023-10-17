import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cart from './slices/cartSlice.ts'
import filter from './slices/filterSlice.ts'
import pizza from './slices/pizzaSlice.ts'

export const store = configureStore({
	reducer: { filter, cart, pizza }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
