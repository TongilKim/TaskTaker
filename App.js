import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { createStore } from 'redux'
import { createStackNavigator } from '@react-navigation/stack'
import IndexScreen from './pages/Index'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import Navbar from './pages/Navbar'
import MessageChat from './components/Message/MessageChat'
import ProfileEdit from './components/Profile/ProfileEdit'
import FavoriteHelper from './components/Profile/FavoriteHelper'
import FavoritePlaces from './components/Profile/FavoritePlaces'
import WroteReview from './components/Profile/WroteReview'
import ReceivedReview from './components/Profile/ReceivedReview'
import Setting from './components/Profile/Setting'
import ChangeName from './components/Profile/ChangeName'
import ChangePhoneNum from './components/Profile/ChangePhoneNum'
import ChangePswd from './components/Profile/ChangePswd'
import ConfirmPswd from './components/Profile/ConfirmPswd'
import SetUpTaskPlace from './components/SearchTask/SetUpTaskPlace'
import SetUpTaskDescription from './components/SearchTask/SetUpTaskDescription'
import SearchAddress from './components/SearchTask/SearchStreetAddress'
import SetUpTaskPrice from './components/SearchTask/SetUpTaskPrice'
import ConfirmTask from './components/SearchTask/ConfirmTask'

export default function App() {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const initialState = {
    counter: 2,
    userId: null,
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        {
          setTimeout(() => {
            setUser(action.userId);
            setLoginStatus(true);
          })
        }
      case 'SIGN_OUT':
        {
          if (user !== null)
            setUser(null);
        }
    }
    return state;
  }

  const store = createStore(reducer);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  })
  
  const LoggedInStack = createStackNavigator();

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          {
            user !== null ? (
              <LoggedInStack.Navigator screenOptions={{ headerShown: true }}>
                 <LoggedInStack.Screen name="Home" component={Navbar}/>
                 <LoggedInStack.Screen name="MessageChat" component={MessageChat} />
                 <LoggedInStack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: '' }} />
                 <LoggedInStack.Screen name="FavoriteHelper" component={FavoriteHelper} />
                 <LoggedInStack.Screen name="FavoritePlaces" component={FavoritePlaces} options={{ title: '' }} />
                 <LoggedInStack.Screen name="WroteReview" component={WroteReview} />
                 <LoggedInStack.Screen name="ReceivedReview" component={ReceivedReview} />
                 <LoggedInStack.Screen name="Setting" component={Setting} />
                <LoggedInStack.Screen name="ChangeName" component={ChangeName} options={{ title: '' }} />
                <LoggedInStack.Screen name="ChangePhoneNumber" component={ChangePhoneNum} options={{ title: '' }} />
                <LoggedInStack.Screen name="ChangePassword" component={ChangePswd} options={{ title: '' }} />
                <LoggedInStack.Screen name="ConfirmPasssword" component={ConfirmPswd} options={{ title: '' }} />
                <LoggedInStack.Screen name="SetUpTaskPlace" component={SetUpTaskPlace} options={{ title: '' }} />
                <LoggedInStack.Screen name="TaskDescription" component={SetUpTaskDescription} options={{ title: '' }} />
                <LoggedInStack.Screen name="SearchAddress" component={SearchAddress} options={{ headerShown: false }} />
                <LoggedInStack.Screen name="TaskPrice" component={SetUpTaskPrice} options={{ title: '' }} />
                <LoggedInStack.Screen name="TaskConfirm" component={ConfirmTask} options={{ title: '', }} />
              </LoggedInStack.Navigator>
            ) :
              (
                <IndexScreen />
              )
          }
        </NavigationContainer>
      </Provider>

    </>
  );
}

