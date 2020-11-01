import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartHeaderButton from '../../UI/CartHeaderButton';

import * as Fonts from '../../../Fonts';
import  Colors from '../../../constans/Colors';
import Price from '../../Price';

import * as cartActions from '../../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id == productId));
    const dispatch = useDispatch();
console.log(selectedProduct)
    return(
        <ScrollView>
           
           
              <Text style={styles.price} value={ `` } >Deskripsi:
Tes IgA mengukur tingkat imunoglobulin A dalam darah, salah satu antibodi paling umum dalam tubuh. Antibodi adalah protein yang dibuat oleh sistem kekebalan tubuh untuk melawan bakteri, virus, dan racun. IgA juga berperan dalam reaksi alergi. Kadar IgA juga mungkin tinggi dalam kondisi autoimun, gangguan di mana tubuh secara keliru membuat antibodi terhadap jaringan sehat.

Manfaat Pemeriksaan:
Mengetahui adanya alergi berdasarkan konsentrasi IgA dari 96 jenis makanan</Text> 
            {/* <Text style={styles.description}>{selectedProduct.description}</Text> */}
           
        </ScrollView>
    );
};

export const screenOptions = navData => {
    return{
        headerTitle: navData.route.params.productTitle,
        headerRight: () => <CartHeaderButton onPress={() => { navData.navigation.navigate('Cart') }} />     
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD
    },
    description: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetailScreen;