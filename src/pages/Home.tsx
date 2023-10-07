import { FC, useContext, useEffect, useState } from 'react'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pagination from '../components/pagination'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import { IPizza } from '../types/types'

const Home: FC = () => {
	const { searchValue } = useContext<unknown>(SearchContext)
	const [items, setItems] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating'
	})

	useEffect(() => {
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		const fetchData = async () => {
			setIsLoading(true)
			const data = await fetch(
				`https://651b10b7194f77f2a5ae311c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			const json = await data.json()
			setIsLoading(false)
			return setItems(json)
		}
		fetchData()
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
					onClickCategory={idx => setCategoryId(idx)}
				/>
				<Sort
					value={sortType}
					onChangeSort={idx => setSortType(idx)}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? sceletons : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	)
}

export default Home
