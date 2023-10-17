import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Sort = {
	name: string
	sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}

export interface FilterSliceState {
	searchValue: string
	categoryId: number
	currentPage: number
	sort: Sort
}

const initialState: FilterSliceState = {
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
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.currentPage = +action.payload.currentPage
			state.categoryId = +action.payload.categoryId
			state.sort = action.payload.sort
		}
	}
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue
} = filterSlice.actions

export default filterSlice.reducer
