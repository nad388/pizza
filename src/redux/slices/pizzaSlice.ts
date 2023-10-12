import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params: any) => {
		const { order, sortBy, category, search, currentPage } = params
		const { data } = await axios.get(
			`https://651b10b7194f77f2a5ae311c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)

		return data
	}
)

const initialState = {
	items: [],
	status: 'loading' // loading | success | error
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state: any, action: any) {
			state.items = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, (state: any) => {
			state.status = 'loading'
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state: any, action: any) => {
			state.items = action.payload
			state.status = 'success'
		})
		builder.addCase(fetchPizzas.rejected, (state: any) => {
			state.status = 'error'
			state.items = []
		})
	}
})

export const selectPizzaData = (state: any) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
