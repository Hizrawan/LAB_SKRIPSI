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

import ScheduleItem from '../../shop/ScheduleItem';
import CartHeaderButton from '../../UI/CartHeaderButton';
import MenuHeaderButton from '../../UI/MenuHeaderButton';

import * as cartActions from '../../../store/actions/cart';
import * as ScheduleActions from '../../../store/actions/schedule';
import Colors from '../../../constans/Colors';

const ScheduleOrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(ScheduleActions.fetchProducts());
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
      //console.log("ini product",products),
        <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={ itemData => <ScheduleItem
            //image={1234567}
            queue={itemData.item.queue}
            title={itemData.item.order_cd}
            onSelect={() => onViewDetails(itemData.item.id, itemData.item.title)}
        >
         
        </ScheduleItem>}
    />    
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Jadwal Pemeriksaan',

    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScheduleOrdersScreen;
