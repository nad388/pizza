import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza: FC = () => {
	const [pizza, setPizza] = useState<any>()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://651b10b7194f77f2a5ae311c.mockapi.io/items/${id}`
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении пиццы!')
				navigate('/')
			}
		}
		fetchPizza()
	}, [])

	if (!pizza) {
		return <h2>Идет загрузка...</h2>
	}
	return (
		<div className='container'>
			<img
				src={pizza.imageUrl}
				style={{ width: '350px', height: '350px' }}
			/>
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
		</div>
	)
}

export default FullPizza
