import React from 'react';
import { Text } from 'react-native';

// this Math.round is a workaround not to show minus price e.g. -0.00. Haven't seen this on android, maybe ios only?

const Price = props => {
    
    return <Text style={{...props.style}}>${Math.round(props.value.toFixed(2) * 100) / 100}</Text>;
};

export default Price;