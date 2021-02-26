import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import Message from './Message'
import Home from './Home'
import Profile from './Profile'

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MessageStack = createStackNavigator();

const NavbarScreen = () => (
    <>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#F9D71C' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Message"
                component={MessageStackScreen}
                options={{
                    tabBarLabel: 'Message',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="message" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    </>
);

export default NavbarScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
);

const MessageStackScreen = ({ navigation }) => (
    <MessageStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <MessageStack.Screen name="Message" component={Message} />
    </MessageStack.Navigator>
);