import { DefaultTheme } from 'react-native-paper'

import { theme } from './theme'

const baseTheme = DefaultTheme

export const paperTheme: typeof DefaultTheme = {
	...baseTheme,
	colors: {
		...baseTheme.colors,
		text: theme.text.main,
		primary: theme.colors.primary,
		background: theme.background.main
	}
}

export default paperTheme
