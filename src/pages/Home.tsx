import qs from 'qs'
import { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import Sort, { listSort } from '../components/Sort'
import Pagination from '../components/pagination'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

const Home: FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { items, status } = useSelector(selectPizzaData)
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)

	const sortType = sort.sortProperty

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx))
	}

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
				currentPage
			})
		)
		window.scrollTo(0, 0)
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
		getPizzas()
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
