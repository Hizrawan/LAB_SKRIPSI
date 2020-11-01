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

import ProductItem from '../../shop/resultItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/result';
import Colors from '../../../constans/Colors';

const TestResultScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
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
      
console.log("THIS IS RESULT LIST",products),
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={ itemData => <ProductItem
                title={itemData.item.order_name}
                queue={"your test result for "+itemData.item.order_name+ " is ready"}
                instruction={"Please go to "+itemData.item.lab_name+" to take your test result"}
            >
                
            </ProductItem>}
        />    
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

export default TestResultScreen;
