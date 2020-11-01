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

import LabItem from '../../shop/LabItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/products';
import * as LabsActions from '../../../store/actions/Labs';
import Colors from '../../../constans/Colors';

const LabListScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(LabsActions.fetchProducts());
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

    const onViewDetails = (lab_id, title) => { 
        props.navigation.navigate('LabOrderList', {
           lab_id : lab_id,
           title : title
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
     
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={ itemData =>
            <LabItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.lab_name}
            
                onSelect={() => onViewDetails(itemData.item.lab_id, itemData.item.lab_name)}
            >
                
                            
            </LabItem>}
        />    
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Order List',
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

export default LabListScreen;
