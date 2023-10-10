import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state: any, action: any) {
			const findItem = state.items.find(
				(obj: any) => obj.id === action.payload.id
			)
			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}
			state.totalPrice = state.items.reduce((sum: any, obj: any) => {
				return obj.price * obj.count + sum
			}, 0)
		},

		minusItem(state: any, action: any) {
			const findItem = state.items.find((obj: any) => obj.id === action.payload)
			if (findItem) {
				findItem.count--
			}
		},

		removeItem(state: any, action: any) {
			state.items = state.items.filter((obj: any) => obj.id !== action.payload)
		},
		clearItems(state: any) {
			state.items = []
			state.totalPrice = 0
		}
	}
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
