import axios from 'axios'
import qs from 'qs'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort, { listSort } from '../components/Sort'
import Pagination from '../components/pagination'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import {
	setCategoryId,
	setCurrentPage,
	setFilters
} from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'
import { IPizza } from '../types/types'

const Home: FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, sort, currentPage } = useSelector(
		(state: RootState) => state.filter
	)
	const sortType = sort.sortProperty

	const { searchValue } = useContext<unknown>(SearchContext)
	const [items, setItems] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx))
	}

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const fetchPizzas = () => {
		setIsLoading(true)

		const order = sortType.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://651b10b7194f77f2a5ae311c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoading(false)
			})
	}
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = listSort.find(
				obj => obj.sortProperty === params.sortProperty
			)

			dispatch(
				setFilters({
					...params,
					sort
				})
			)
			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			fetchPizzas()
		}
		isSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = items
		// .filter(item => {
		// 	return item.title.toLowerCase().includes(searchValue.toLowerCase())
		// })
		.map(item => (
			<PizzaBlock
				key={item.id}
				{...item}
			/>
		))

	const sceletons = [...new Array(6)].map((_, idx) => <Sceleton key={idx} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onClickCategory={onChangeCategory}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? sceletons : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	)
}

export default Home
