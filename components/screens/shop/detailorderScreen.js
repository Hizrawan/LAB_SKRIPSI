import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    FlatList,
    ScrollView,
    Button,
    ActivityIndicator,
    StyleSheet,
    Text
 } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/resultItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/detail';
import Colors from '../../../constans/Colors';

const detailorderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const order_cd =  props.route.params.order_cd;
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts(order_cd));
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

    const onViewDetails = (id, title) => { 
        props.navigation.navigate('ProductsOverview', {
           
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

    return (
        <ScrollView>
           
           
       
      <Text style={styles.description}>{products[0].order_desc}</Text>
     
  </ScrollView>
  
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Result',
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />,
        
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default detailorderScreen;
