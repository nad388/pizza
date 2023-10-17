import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IPizza } from '../../types/types'
import { RootState } from '../store'

export const fetchPizzas = createAsyncThunk<IPizza[], Record<string, string>>(
	'pizza/fetchPizzasStatus',
	async params => {
		const { order, sortBy, category, search, currentPage } = params
		const { data } = await axios.get<IPizza[]>(
			`https://651b10b7194f77f2a5ae311c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)

		return data
	}
)

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
	items: IPizza[]
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<IPizza[]>) {
			state.items = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.status = Status.ERROR
			state.items = []
		})
	}
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
