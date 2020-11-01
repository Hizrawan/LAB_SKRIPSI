import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    Alert
 } from 'react-native';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../UI/Input';
import Card from '../../UI/Card';

import * as authActions from '../../../store/actions/auth';

import Platform from '../../../constans/Platform';
import Colors from '../../../constans/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for( const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formsIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }

    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false
        },
        formsIsValid:  false
    });    

    useEffect(() => {
        if(error) {
            Alert.alert('Error occured!', error, [
                { text: 'OK' }
            ]);
        }
    }, [error])
    
    const onAuth = async () => {
        let action;
        if(isSignUp) {
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }

        setError(null);
        setIsLoading(true);
        try  {
            await dispatch(action); 
            //props.navigation.navigate('Shop');
        }catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const onInputChange = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);    

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.isAndroid ? 'height' : 'padding'}
            keyboardVerticalOffset={50}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={onInputChange}
                            initialValue=""
                        />
                <Input
                            id='password'
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={onInputChange}
                            initialValue=""
                        />   
                        <View style={styles.buttonContainer} >
                            { isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : 
                                <Button title={isSignUp ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={onAuth} />
                            }
                        </View>
                        <View style={styles.buttonContainer} >
                            <Button
                                title={`Switch to ${isSignUp ? 'login' : 'sign up'}`}
                                color={Colors.accent}
                                onPress={() => { setIsSignUp(prevState => !prevState) }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>

        </KeyboardAvoidingView>

    );
};

export const screenOptions = () => {
    return { headerTitle: "Authenticate" };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 300,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    buttonContainer: {
        marginTop: 10
    }

});

export default AuthScreen;