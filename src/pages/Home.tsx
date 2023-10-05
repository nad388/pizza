import { FC, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import { IPizza } from '../types/types'

const Home: FC = () => {
	const [items, setItems] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating'
	})

	useEffect(() => {
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')
		const category = categoryId > 0 ? `category=${categoryId}` : ''

		const fetchData = async () => {
			setIsLoading(true)
			const data = await fetch(
				`https://651b10b7194f77f2a5ae311c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
			)
			const json = await data.json()
			setIsLoading(false)
			return setItems(json)
		}
		fetchData()
		window.scrollTo(0, 0)
	}, [categoryId, sortType])

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
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, idx) => <Sceleton key={idx} />)
					: items.map(item => (
							<PizzaBlock
								key={item.id}
								{...item}
							/>
					  ))}
			</div>
		</div>
	)
}

export default Home
