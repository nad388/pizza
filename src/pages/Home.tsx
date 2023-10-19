import { FC, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pagination from '../components/pagination'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'
import { useAppDispatch } from '../redux/store'

const Home: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { items, status } = useSelector(selectPizzaData)
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)

	const sortType = sort.sortProperty

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx))
	}, [])

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		const order = sortType.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage)
			})
		)
		window.scrollTo(0, 0)
	}
	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const queryString = qs.stringify({
	// 			sortProperty: sort.sortProperty,
	// 			categoryId,
	// 			currentPage
	// 		})
	// 		navigate(`?${queryString}`)
	// 	}
	// 	isMounted.current = true
	// }, [categoryId, sort.sortProperty, currentPage])

	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(
	// 			window.location.search.substring(1)
	// 		) as unknown as SearchPizzaParams

	// 		const sort = listSort.find(obj => obj.sortProperty === params.sortBy)

	// 		dispatch(
	// 			setFilters({
	// 				searchValue: params.search,
	// 				categoryId: +params.category,
	// 				currentPage: +params.currentPage,
	// 				sort: sort || listSort[0]
	// 			})
	// 		)
	// 		isSearch.current = true
	// 	}
	// }, [])

	useEffect(() => {
		getPizzas()
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = items.map((item: any) => (
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
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
						позже.
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? sceletons : pizzas}
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	)
}

export default Home
