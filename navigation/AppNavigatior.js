import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import  {ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../components/screens/StartupScreen';

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

    const getNavigator = () => {

        if(isAuth) {
            return <ShopNavigator />;
        }

        if(!isAuth && didTryAutoLogin){
            return <AuthNavigator />;
        }

        return <StartupScreen />;
    };

    return (
        <NavigationContainer>
            {getNavigator()}
        </NavigationContainer>
    );
};

export default AppNavigator;