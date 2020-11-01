import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator
 } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Price from '../../Price';
import Card from '../../UI/Card';
import CartItem from '../../shop/CartItem';

import * as cartActions from '../../../store/actions/cart';
import * as ordersActions from '../../../store/actions/orders';

import * as Fonts from '../../../Fonts';
import Colors from '../../../constans/Colors';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].title,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                order_code: state.cart.items[key].order_code
                
            })
           
        }
       
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    console.log();

    const onSendOrder = async () => {
        
         setIsLoading(true);
        for(const key in cartItems) {
           
           const ordcd = cartItems[key].order_code;
           const qty = cartItems[key].quantity;
           const sum = cartItems[key].sum;
           
            await dispatch(ordersActions.addOrder(ordcd, qty, sum));
        }
       
        setIsLoading(false);
        props.navigation.navigate('Orders', {
           medical_no : 191209200,
           sum: cartTotalAmount
        //    title : title
        });  
    }

    return (
       
        <View style={styles.screen}>
            <Card style={styles.summary} >
                <Text style={styles.summaryText}>Total: <Price style={styles.amount} value={cartTotalAmount} /></Text>
                { isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> : (
                    <Button
                        color={Colors.accent}
                        title="Order Now"
                        disabled={cartItems.length === 0}
                        onPress={onSendOrder}
                    />
                )}


            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData =>
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.order_name}
                            amount={itemData.item.sum}
                            deletable 
                            onRemove={() => { 
                                dispatch(cartActions.removeFromCart(itemData.item.productId))
                            }}
                        />
                    }
                />

            </View>
        </View>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Orders',

    }
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});

export default CartScreen;
