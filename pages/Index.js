import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './GetStarted';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';
import PhoneVerify from '../components/SignUp/PhoneVerify';

const RootStack = createStackNavigator();

export default function Index(props) {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="GetStarted" component={GetStarted} headerMode='float' />
            <RootStack.Screen name="SignIn" component={SignIn} />
            <RootStack.Screen name="SignUp" component={SignUp} />
            <RootStack.Screen name="PhoneVerify" component={PhoneVerify} />
        </RootStack.Navigator>
    )
}
