import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    FlatList,
    Button,
    ActivityIndicator,
    StyleSheet,
    Text
 } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import LabOrderItem from '../../shop/LabOrderItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/products';
import * as LabOrdersActions from '../../../store/actions/LabOrders';
import Colors from '../../../constans/Colors';

const LabListScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
   const lab_id =  props.route.params.lab_id;
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(LabOrdersActions.fetchProducts(lab_id));
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);

    }, [dispatch, setIsLoading, setError]);

    // nie robić async przy useEffect, tzn. useEffect(async () => {...}) !!
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {setIsLoading(false)}).catch(err => { /*  handle errors! */});
    }, [dispatch, loadProducts]);

    // ładujemy zawsze, gdy wejdziemy na ten ekran, bo mogło się coś zmienić na serwerze
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts);

        return () => {
            unsubscribe();
        };
    }, [loadProducts]);

    const onViewDetails = ( order_cd) => { 
        props.navigation.navigate('detailorder', {
            order_cd : order_cd,
        });
     };

    if(error) {
        return (
            <View style={styles.centered}>
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
            </View>
        );        
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        ); 
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Add some.</Text>
            </View>
        );
    }
   const harga = products[0].price;
    return (
        
        console.log('qeiurheuiwhriuwehriuwhe',products[0].order_code),
        <FlatList
        
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={ itemData =>
            <LabOrderItem
            //imageUrl={itemData.item.imageUrl}
            
            title={itemData.item.order_name}
            price = {parseInt(itemData.item.price)}
            
                onSelect={() => onViewDetails(itemData.item.order_code)}
            >
                   <Button   title="Add to Cart" 
                    onPress={() => { 
                        dispatch(cartActions.addToCart(itemData.item));
                    }} 
                />    
                                  
            </LabOrderItem>
           
            
        }
        />    
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Laboratories',
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />,
        
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
   
});

export default LabListScreen;
