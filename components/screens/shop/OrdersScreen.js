import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MenuHeaderButton from '../../UI/MenuHeaderButton';
import OrderItem from '../../shop/OrderItem';

import * as ordersActions from '../../../store/actions/orders';
import Colors from '../../../constans/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
//console.log("inismuinimisuminisuj",props);
    const orders = useSelector(state => state.orders.orders);
    
    const dispatch = useDispatch();
    const sum = props.route.params.amount;
    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        }).catch( err => { /* error handling */  });
    }, [dispatch])

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if(orders.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <Text>No orders found. Create new ones.</Text>
            </View>
        );
    }    

    return (
        
        <FlatList
            data={orders}
            keyExtractor={ item => item.id}
            renderItem={itemData => 
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
                
        }/>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: "Daftar Pesanan",

    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;