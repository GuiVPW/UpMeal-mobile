import {
	createNativeStackNavigator,
	NativeStackScreenProps
} from '@react-navigation/native-stack'
import { ParamListBase } from '@react-navigation/routers'

export interface RootStackParamList extends ParamListBase {
	Home: undefined
	Map: undefined
}

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	T
>

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface RootParamList extends RootStackParamList {}
	}
}

export const AppStack = createNativeStackNavigator<RootStackParamList>()
