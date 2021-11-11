export interface Item {
	key: string
	title: string
	imageUri?: string
	text: string
	backgroundColor: string
}

export const slides: Item[] = [
	{
		key: 'one',
		title: 'Evite o Desperdício',
		text: 'Description.\nSay something cool',
		imageUri: '',
		backgroundColor: '#59b2ab'
	},
	{
		key: 'two',
		title: 'Title 2',
		text: 'Other cool stuff',
		backgroundColor: '#febe29'
	},
	{
		key: 'three',
		title: 'Rocket guy',
		text: `I'm already out of descriptions\n\nLorem ipsum bla bla bla`,
		backgroundColor: '#22bcb5'
	}
]
