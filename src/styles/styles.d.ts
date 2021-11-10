import 'styled-components'
import { theme, DefaultTheme as ThemeType } from './theme'

declare module 'styled-components' {
	export interface DefaultTheme extends ThemeType {}
}
