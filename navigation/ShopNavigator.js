import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Button, View } from 'react-native';

import * as Fonts from '../Fonts';
import * as authActions from '../store/actions/auth';
import IconsNames from '../constans/IconsNames';

import ProductsOverviewScreen, {screenOptions as productOverviewScreenOptions } from '../components/screens/shop/ProductsOverviewScreen';
import LabListScreen, {screenOptions as LablistScreenOptions } from '../components/screens/shop/LabListScreen';
import LabOrderListScreen, {screenOptions as LabOrderlistScreenOptions } from '../components/screens/shop/LabOrderListScreen';
import TestResultScreen, {screenOptions as TestResultScreenOptions } from '../components/screens/shop/TestResultScreen';
import ScheduleOrdersScreen, {screenOptions as ScheduleOrdersScreenOptions } from '../components/screens/shop/ScheduleOrdersScreen';
import LabProductsOverviewScreen, {screenOptions as LabproductOverviewScreenOptions } from '../components/screens/shop/LabProductsOverviewScreen';
import ProductDetailScreen, {screenOptions as productDetailsScreenOptions } from '../components/screens/shop/ProductDetailScreen';
import CartScreen, {screenOptions as cartScreenOptions} from '../components/screens/shop/CartScreen';
import OrdersScreen, {screenOptions as orderScreenOptions} from '../components/screens/shop/OrdersScreen';
import UserProductScreen, {screenOptions as userProductScreenOptions} from '../components/screens/user/UserProductsScreen';
import EditProductScreen, {screenOptions as editProductScreenOptions} from '../components/screens/user/EditProductScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../components/screens/user/AuthScreen' ;
import detailorderScreen, {screenOptions as detailorderScreenOptions } from '../components/screens/shop/detailorderScreen';

import Colors from '../constans/Colors';
import Platform from '../constans/Platform';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.isAndroid ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD
    },
    headerBackTitleStyle: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR
    },
    headerTintColor: Platform.isAndroid ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen 
                name="LabProductsOverview"
                component={LabProductsOverviewScreen}
                options={LabproductOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="LabList"
                component={LabListScreen}
                options={LablistScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="LabOrderList"
                component={LabOrderListScreen}
                options={LabOrderlistScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="detailorder"
                component={detailorderScreen}
                options={detailorderScreenOptions}
            />
              <ProductsStackNavigator.Screen 
                name="TestResult"
                component={TestResultScreen}
                options={TestResultScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="ScheduleOrders"
                component={ScheduleOrdersScreen}
                options={ScheduleOrdersScreenOptions}
            />
           
            <ProductsStackNavigator.Screen 
                name="UserProduct"
                component={UserProductScreen}
                options={userProductScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name="ProductsOverview"
                component={ProductsOverviewScreen}
                options={productOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={productDetailsScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            />
             <ProductsStackNavigator.Screen name="UserProducts" component={UserProductScreen} options={userProductScreenOptions} />
            <ProductsStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={editProductScreenOptions} />
            <ProductsStackNavigator.Screen name="Orders" component={OrdersScreen} options={orderScreenOptions} />
        </ProductsStackNavigator.Navigator>
    );
}

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen name="Orders" component={OrdersScreen} options={orderScreenOptions} />
        </OrdersStackNavigator.Navigator>
    );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen name="UserProducts" component={UserProductScreen} options={userProductScreenOptions} />
            <AdminStackNavigator.Screen name="EditProduct" component={EditProductScreen} options={editProductScreenOptions} />
        </AdminStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
        </AuthStackNavigator.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    // atrybut rózni się tylko nazwą
    const createDrawerIcon = name => {
        return {
            drawerIcon: props => <Ionicons name={name} size={23} color={props.color} />
        };
    }

    return (
        <ShopDrawerNavigator.Navigator 
            drawerContent={ props => {
                return (
                    <View style={{flex: 1, padding: 20}}>
                        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props}  />
                                <Button title="Logout" color={Colors.primary} onPress={() => {
                                    dispatch(authActions.logout());
                                }} />
                        </SafeAreaView>
                    </View>               
                );
            }}
            drawerContentOptions={{ activeTintColor: Colors.primary }}
        >
            <ShopDrawerNavigator.Screen name="Products" component={ProductsNavigator} 
                options={ () => createDrawerIcon(IconsNames.cart )}
            />
            <ShopDrawerNavigator.Screen name="Orders" component={OrdersNavigator} 
                options=  { () => createDrawerIcon(IconsNames.list )}
            />
            <ShopDrawerNavigator.Screen name="Admin" component={AdminNavigator} 
                options=  { () => createDrawerIcon(IconsNames.create )} 
            />
        </ShopDrawerNavigator.Navigator>        
    );
};