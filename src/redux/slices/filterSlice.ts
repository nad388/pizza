import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating'
	}
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.currentPage = +action.payload.currentPage
			state.categoryId = +action.payload.categoryId
			state.sort = action.payload.sort
		}
	}
})

export const selectFilter = (state: any) => state.filter
export const selectSort = (state: any) => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue
} = filterSlice.actions

export default filterSlice.reducer
