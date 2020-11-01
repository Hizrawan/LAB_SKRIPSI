import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from './HeaderButton';
import IconsNames from '../../constans/IconsNames';


const AddProductHeaderButton = props => {
    return(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Add product'
            iconName={IconsNames.create}
            onPress={props.onPress}
        />
    </HeaderButtons>
    );
};

export default AddProductHeaderButton;