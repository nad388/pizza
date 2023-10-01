import { FC, useState } from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]

const Categories: FC = () => {
	const [activeCategory, setActiveCategory] = useState(0)

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, idx) => (
					<li
						key={idx}
						onClick={() => setActiveCategory(idx)}
						className={activeCategory === idx ? 'active' : ''}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
