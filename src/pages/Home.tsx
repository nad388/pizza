import { FC, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/pizzaBlock'
import Sceleton from '../components/pizzaBlock/Sceleton'
import { IPizza } from '../types/types'

const Home: FC = () => {
	const [items, setItems] = useState<IPizza[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				'https://651b10b7194f77f2a5ae311c.mockapi.io/items'
			)
			const json = await data.json()
			setIsLoading(false)
			return setItems(json)
		}
		fetchData()
	}, [])
	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
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
		</>
	)
}

export default Home
