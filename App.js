import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo } from 'react'
import { LogBox, Button } from 'react-native';
import { createStore } from 'redux'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import IndexScreen from './pages/Index'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
//import Firebase from '../../Firebase'
import * as firebase from 'firebase';

import Navbar from './pages/Navbar'
import NavbarTasker from './pages/Tasker/Navbar_Tasker'
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
import SearchAddress from './components/CommonComponents/SearchStreetAddress'
import SetUpTaskPrice from './components/SearchTask/SetUpTaskPrice'
import ConfirmTask from './components/SearchTask/ConfirmTask'
import SignUpTasker from './components/SignUp/Tasker/SignUp_Tasker'
import SignUpProfilePic from './components/SignUp/Tasker/SignUp_ProfilePic'
import SignUpIdPic from './components/SignUp/Tasker/SignUp_IdPic' 
import SignUpIdPicWithFace from './components/SignUp/Tasker/SignUp_IdPicWithFace'
import SignUpExtraInfo from './components/SignUp/Tasker/SignUp_ExtraInfo'
import UploadPicture from './components/CommonComponents/UploadPicture'
import PendingTask from './components/RequestTask/PendingTask'

export default function App() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [helperMode, setHelperMode] = useState(false);

  const initialState = {
    taskerMode: true,
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGED_IN':
        {
          setCurrentUserId(action.userId);
          break;
        }
      case 'SIGN_OUT':
        {
          if (currentUserId !== null) {
            setCurrentUserId(null);
            setHelperMode(false);
          } 
          break;
        }
      case 'SWITCH_MODE':
        {
          // return ({
        //   ...state,
        //   taskerMode: !state.taskerMode
        // });
          setHelperMode(!helperMode);
        }
        
      default:
        return state;
    }

  }

  const store = createStore(reducer, initialState);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    
  });
  
  const LoggedInStack = createStackNavigator();

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        />
      <Provider store={store}>
        <NavigationContainer>
          {
            currentUserId !== null ? (
              
              <LoggedInStack.Navigator screenOptions={{ headerShown: true }}>
                 <LoggedInStack.Screen name="Home" component={helperMode ? NavbarTasker : Navbar}/>
                 <LoggedInStack.Screen name="MessageChat" component={MessageChat} />
                 <LoggedInStack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: '' }} />
                 <LoggedInStack.Screen name="FavoriteHelper" component={FavoriteHelper} />
                 <LoggedInStack.Screen name="FavoritePlaces" component={FavoritePlaces} options={{ title: '' }} />
                 <LoggedInStack.Screen name="WroteReview" component={WroteReview} />
                 <LoggedInStack.Screen name="ReceivedReview" component={ReceivedReview} />
                 <LoggedInStack.Screen name="Setting" component={Setting} />
                <LoggedInStack.Screen name="ChangeName" component={ChangeName} options={{ title: '' }} />
                <LoggedInStack.Screen name="ChangePhoneNumber" component={ChangePhoneNum} options={{ title: '' }} />
                <LoggedInStack.Screen name="ChangePassword" component={ChangePswd} options={{
                  title: '',
                  header: ({ navigation }) => {
                    return (
                            <HeaderBackButton
                            onPress={() => navigation.navigate('ProfileEdit')}
                            color="#000"
                            style={{marginTop: '13%'}}
                              />
                    );
                  }
                }} />
                <LoggedInStack.Screen name="ConfirmPasssword" component={ConfirmPswd} options={{ title: '' }} />
                <LoggedInStack.Screen name="SetUpTaskPlace" component={SetUpTaskPlace} options={{ title: '' }} />
                <LoggedInStack.Screen name="TaskDescription" component={SetUpTaskDescription} options={{ title: '' }} />
                <LoggedInStack.Screen name="SearchAddress" component={SearchAddress} options={{ headerShown: false }} />
                <LoggedInStack.Screen name="TaskPrice" component={SetUpTaskPrice} options={{ title: '' }} />
                <LoggedInStack.Screen name="TaskConfirm" component={ConfirmTask} options={{ title: '', }} />
                <LoggedInStack.Screen name="SignUpTasker" component={SignUpTasker} options={{ title: '' }} />
                <LoggedInStack.Screen name="SignUpProfilePic" component={SignUpProfilePic} options={{ title: '' }} />
                <LoggedInStack.Screen name="SignUpIdPic" component={SignUpIdPic} options={{ title: '' }} />
                <LoggedInStack.Screen name="SignUpIdPicWithFace" component={SignUpIdPicWithFace} options={{ title: '' }} />
                <LoggedInStack.Screen name="SignUpExtraInfo" component={SignUpExtraInfo} options={{ title: '' }} />
                <LoggedInStack.Screen name="UploadPicture" component={UploadPicture} options={{ title: '' }} />
                <LoggedInStack.Screen name="PendingTask" component={PendingTask} options={{ title: '' }} />
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

