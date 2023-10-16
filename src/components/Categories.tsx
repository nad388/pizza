import { FC } from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]
interface CategoriesProps {
	value: number
	onClickCategory: (idx: number) => void
}

const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((item, idx) => (
					<li
						key={idx}
						onClick={() => onClickCategory(idx)}
						className={value === idx ? 'active' : ''}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
