import React, { useEffect, useState, } from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, Card, Title, List, Divider } from 'react-native-paper';
import { Badge, } from 'react-native-elements';
import Firebase from '../Firebase'
import * as firebase from 'firebase';


export default function Message(props) {
    const [userList, setUserList] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); 
    let subscribeFireStore = function (){};

    const updateUserMsgStatus = () => {
        let currentUserId = Firebase.getCurrentUserId();

        const msgRef = firebase.firestore().collection('users').doc(currentUserId).collection('msgUsers');
        subscribeFireStore = msgRef.onSnapshot(snapshot => {
            let otherUserList = snapshot.docs;
            
            Promise.all(otherUserList.map((otherUser) => {
                return firebase.firestore().collection('users')
                    .doc(otherUser.id).collection('msgUsers')
                    .doc(currentUserId).get().then((currentUser) => {
                        if (currentUser.data().CurrentMsgLength !== currentUser.data().LastMsgLength) {
                            return ({ info: otherUser.data(), msgViewStatus: false, id: otherUser.id, initialMsgLength: otherUser.data().CurrentMsgLength });
                        } else {
                            
                            return ({ info: otherUser.data(), msgViewStatus: true, id: otherUser.id, initialMsgLength: otherUser.data().CurrentMsgLength });
                        }

                    });
            })).then((data) => {
                setUserList(data);
            }).catch((err) => {
                console.log('err: ', err);
            });
        });
        
    };
    const onUserClick = (userId, msgLength) => {
        
        Firebase.setSelectedUserId(userId);
        if (msgLength !== undefined) {
            Firebase.updateLastMsgLength(msgLength);
        }
        Firebase.getMessages((messages) => {
            return props.navigation.navigate("MessageChat", { updateUserMsgStatus: () => updateUserMsgStatus(), selectedUserMessages: JSON.stringify(messages), currentUserObj: currentUser, selectedUserId: userId });
        });
    };
    
    useEffect(() => {

        if (currentUser === null || userList === null) {
            Firebase.getCurrentUserObj(async (obj) => {
                await setCurrentUser(obj);
                updateUserMsgStatus();
            });
        };
      
        if (currentUser !== null) {
           updateUserMsgStatus();
        };
        
        const unsubscribe = props.navigation.addListener('blur', () => {
            subscribeFireStore();
        });
        return unsubscribe;
    }, []);

    
    return currentUser !== null && userList !== null ? (
        <>
            <View style={{ marginTop: '8%' }}>
                <Title style={{ textAlign: 'center' }}>Messages</Title>
                <ScrollView>
                    <Card style={{ marginTop: '5%' }}>
                        {
                            userList.map((user) => {
                                 //console.log(user);
                                return (
                                    <List.Section key={user.id}>
                                        <List.Item title={user.info.FirstName}
                                            description={user.info.LastReceivedMsg ? user.info.LastReceivedMsg.text : ''}
                                            left={() => <View style={{ marginRight: '2%' }} >
                                                <Avatar.Image size={50}
                                                source={{ uri: user.info.ProfileImg }}
                                                />
                                                {user.msgViewStatus ? <></> : <Badge
                                                    status="success"
                                                    containerStyle={{ position: 'absolute', top: -1, right: -1 }}
                                                /> }
                                            </View>}
                                            right={() => <Text style={{ alignSelf: 'center', fontSize: 12 }}>{user.LastChatDate !== undefined ? new Date(user.LastChatDate.seconds * 1000).toLocaleDateString("en-US") : ''} </Text>}
                                            onPress={() => onUserClick(user.id, user.initialMsgLength)}
                                        />
                                        <Divider />
                                    </List.Section>
                                )
                            })
                        }
                    </Card>
                </ScrollView>
            </View>
        </>
    ) : (<></>)
}

