import { ExpoConfig, ConfigContext } from '@expo/config'

const appName = 'UpMeal'
const versionBuild = '1.0.0'

function convertToAndroidVersion(version: string): number {
	const splittedVersion = version.split('.')

	return Number(`${splittedVersion.splice(0, 1)}.${splittedVersion.join('')}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: appName,
	slug: appName,
	version: versionBuild,
	orientation: 'portrait',
	icon: './assets/icon.png',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#50cf8d'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
		bundleIdentifier: 'com.vortechs.upmeal',
		buildNumber: versionBuild,
		config: {
			googleMapsApiKey: process.env.GOOGLE_API_KEY
		}
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF'
		},
		package: 'com.vortechs.upmeal',
		versionCode: convertToAndroidVersion(versionBuild),
		config: {
			googleMaps: {
				apiKey: process.env.GOOGLE_API_KEY
			}
		}
	},
	web: {
		favicon: './assets/favicon.png'
	}
})
