import 'styled-components'
import { DefaultTheme as ThemeType } from './theme'

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends ThemeType {}
}
