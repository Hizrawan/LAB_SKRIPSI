import React from 'react';
import { FlatList, Button, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../shop/ProductItem';
import MenuHeaderButton from '../../UI/MenuHeaderButton';
import AddProductHeaderButton from '../../UI/AddProductHeaderButton';

import * as productsActions from '../../../store/actions/products';
import Colors from '../../../constans/Colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    
    const dispatch = useDispatch();

    const onEditProduct = (id) => {
        props.navigation.navigate('EditProduct', {productId: id});
    }

    const onDelete = id => {
        Alert.alert('Are you sure?', 'Are you sure you want permanently remove this item?', [
            {
                text: 'No',
                style: 'default'
            },
            { 
                text: 'Yes', 
                style: 'destructive', 
                onPress: () => { dispatch(productsActions.deleteProduct(id)); } 
            }
        ]);
    };

    if(userProducts.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                <Text>No product found. Add new ones.</Text>
            </View>
        );
    }

    return(
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { onEditProduct(itemData.item.id) }}
                >
                    <Button color={Colors.primary} title="Edit" onPress={() => { onEditProduct(itemData.item.id) }} />
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={() => {
                            onDelete(itemData.item.id);
                        }}
                    />                    
                </ProductItem>
            }
        />
    );
};

export const screenOptions =  navData => {
    return {
        headerTitle: 'Add Order',
        headerRight: () => <AddProductHeaderButton onPress={() => navData.navigation.navigate('EditProduct')} />,
        //headerLeft: () => <MenuHeaderButton onPress={() => { navData.navigation.toggleDrawer() }} />        
    }
};

export default UserProductsScreen;