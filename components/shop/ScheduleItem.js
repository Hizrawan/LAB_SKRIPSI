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

const ScheduleItem = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.isAndroidRippleEffectAvailable) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                <View style={styles.details}>
                        
                        <Text style={styles.queue} >Your Queue</Text>
                    </View>
                    <View style={styles.imageContainer}>
                    <Text style={styles.title}>{props.queue}</Text>
                    <Text style={styles.price} >{props.title}</Text>
                    </View>

                    <View style={styles.details}>
                        
                        
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
        height: 175,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },  
    imageContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    queue: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 24,
        marginVertical: 0,
        
    },
    title: {
        fontFamily: Fonts.FONT_OPEN_SANS_BOLD,
        fontSize: 48,
        marginVertical: 2,
        margin: 100,
        marginTop: 0,
        alignItems: 'center',
    },
    price: {
        fontFamily: Fonts.FONT_OPEN_SANS_REGULAR,
        fontSize: 14,
        color: '#888',
        alignItems: 'center',
        marginLeft:30
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
        height: '20%',
        padding: 10
    }
});

export default ScheduleItem;