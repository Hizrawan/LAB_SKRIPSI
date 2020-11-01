import { Platform } from 'react-native';

export default {
    isAndroid: Platform.OS === 'android',
    isAndroidRippleEffectAvailable: Platform.OS === 'android' && Platform.Version >= 21,
}