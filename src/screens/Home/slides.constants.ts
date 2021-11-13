import cellphone from '../../images/cellphone.png'
import foodBag from '../../images/food-bag.png'
import recicle from '../../images/recicle.png'
import waste from '../../images/waste.png'

export interface Item {
	key: string
	title: string
	image?: string
	text: string
	backgroundColor: string
}

export const slides: Item[] = [
	{
		key: 'one',
		title: 'Evite o Desperdício!',
		text: 'Encontre estabelecimentos com alimentos perto da sua validade.',
		image: foodBag,
		backgroundColor: '#03a9f4'
	},
	{
		key: 'two',
		title: 'Compare e Reserve!',
		text: 'Ache, através do mapa interativo, o estabelecimento mais próximo de você.',
		backgroundColor: '#f9a825',
		image: cellphone
	},
	{
		key: 'three',
		title: 'Reúse ou Distribua',
		text: 'Contribua distribuindo ou reusando os alimentos adquiridos.',
		backgroundColor: '#22bcb5',
		image: recicle
	},
	{
		key: 'four',
		title: 'Acabe com a Fome!',
		text: 'Ajude a diminuir o desperdício e a erradicar a fome!',
		backgroundColor: '#ff7e82',
		image: waste
	}
]
