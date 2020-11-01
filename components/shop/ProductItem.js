import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback
 } from 'react-native';

import * as Fonts from '../../Fonts'
import Price from '../Price';
import Card from '../UI/Card';

import Platform from '../../constans/Platform';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.isAndroidRippleEffectAvailable) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}} />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Price style={styles.price} value={props.price} />
                    </View>

                    <View  style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },  
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    }
});

export default ProductItem;