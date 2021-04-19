import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import MessageTasker from './Message_Tasker'
import HomeTasker from './Home_Tasker'
import ProfileTasker from './Profile_Tasker'
import TaskList from './TaskList'

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MessageStack = createStackNavigator();
const TaskStack = createStackNavigator();

const NavbarScreen = () => (
    <>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{ backgroundColor: '#0b7fab' }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Task"
                component={TaskStackScreen}
                options={{
                    tabBarLabel: 'Task',
                    tabBarIcon: ({ color }) => (
                        <Icon name='tasks'
                        type='font-awesome' color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
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
        <HomeStack.Screen name="Home" component={HomeTasker} />
    </HomeStack.Navigator>
);
const TaskStackScreen = () => (
    <TaskStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <TaskStack.Screen name="Task" component={TaskList} />
    </TaskStack.Navigator>
);
const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <ProfileStack.Screen name="Profile" component={ProfileTasker} />
    </ProfileStack.Navigator>
);

const MessageStackScreen = ({ navigation }) => (
    <MessageStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <MessageStack.Screen name="Message" component={MessageTasker} />
    </MessageStack.Navigator>
);