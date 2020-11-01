import Platform from './Platform';

export default {
    list: Platform.isAndroid ? 'md-list' : 'ios-list',
    cart: Platform.isAndroid ? 'md-cart' : 'ios-cart',
    create: Platform.isAndroid ? 'md-create' : 'ios-create',
    checkmark: Platform.isAndroid ? 'md-checkmark' : 'ios-checkmark',
    menu: Platform.isAndroid ? 'md-menu' : 'ios-menu'
}