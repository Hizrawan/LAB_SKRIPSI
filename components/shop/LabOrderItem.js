import React from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback
 } from 'react-native';

import * as Fonts from '../../Fonts'
import Price from '../Price';
import Card from '../UI/Card';

import Platform from '../../constans/Platform';

const LabOrderItem = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.isAndroidRippleEffectAvailable) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                <Text style={styles.title}>{props.title}</Text>
                
             <Price style={styles.price}  value={props.price} />  
            
                    {/* <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                  <Price style={styles.price} value={props.price} /> 
                    </View> */}

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
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 150,
        margin: 10
    },
    touchable: {
        flexDirection: "row",
        borderRadius: 10,
        overflow: 'hidden'
    },  
    imageContainer: {
        flexDirection: "row",
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
       flexDirection: "row",
        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 24,
        marginHorizontal: 30,
        marginVertical: 5,
    },
    button: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 9,
        
        
        
    },
    price: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 14,
        color: '#888',
        marginHorizontal: 30,
        marginVertical: 0,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '100%',
        padding: 10
    }
});

export default LabOrderItem;