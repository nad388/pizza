import axios from 'axios'
import { FC, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pagination from '../components/pagination'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import { RootState } from '../redux/store'
import { IPizza } from '../types/types'

const Home: FC = () => {
	const { categoryId, sort, currentPage } = useSelector(
		(state: RootState) => state.filter
	)
	const sortType = sort.sortProperty

	const dispatch = useDispatch()

	const { searchValue } = useContext<unknown>(SearchContext)
	const [items, setItems] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const onChangeCategory = (idx: number) => {
		dispatch(setCategoryId(idx))
	}

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	useEffect(() => {
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

		window.scrollTo(0, 0)
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
