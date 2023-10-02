// import pizzas from './assets/pizzas.json'
import { useEffect, useState } from 'react'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'
import './scss/app.scss'
import { IPizza } from './types/types'

function App() {
	const [items, setItems] = useState<IPizza[]>([])

	// useEffect(() => {
	// 	fetch('https://651b10b7194f77f2a5ae311c.mockapi.io/items')
	// 		.then(res => {
	// 			return res.json()
	// 		})
	// 		.then(json => {
	// 			setItems(json)
	// 		})
	// }, [])

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				'https://651b10b7194f77f2a5ae311c.mockapi.io/items'
			)
			const json = await data.json()
			return setItems(json)
		}
		fetchData()
	}, [])

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{items.map(item => (
							<PizzaBlock
								key={item.id}
								{...item}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
