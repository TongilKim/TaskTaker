import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Card, Title, List, Divider } from 'react-native-paper';
import Firebase from '../Firebase'



export default function Message(props) {
    const [userLists, setUserLists] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        let userList = Firebase.getMsgUserList();
        setUserLists(userList);

        Firebase.getCurrentUserObj((obj) => {
            setCurrentUser(obj);
        })

    }, [])

    const onUserClick = (userId) => {
        Firebase.setSelectedUserId(userId);
        Firebase.getMessages((messages) => {
            return props.navigation.navigate("MessageChat", { selectedUserMessages: JSON.stringify(messages), currentUserObj: currentUser });
        });

    }

    return userLists !== null && currentUser !== null ? (
        <>
            <View style={{ marginTop: '8%' }}>
                <Title style={{ textAlign: 'center' }}>Messages</Title>
                <Text style={{ textAlign: 'center' }}>{currentUser[0].id}</Text>
                <ScrollView>
                    <Card style={{ marginTop: '5%' }}>
                        {
                            userLists.map((user) => {
                                return (
                                    <List.Section key={user.id}>
                                        <List.Item title={user.FirstName}
                                            description={user.description ? user.description : ''}
                                            left={() => <Avatar.Image size={50}
                                                source={{ uri: user.ProfileImg }}
                                                style={{ marginRight: '2%' }} />}
                                            right={() => <Text style={{ alignSelf: 'center', fontSize: 12 }}>{user.LastChatDate !== undefined ? new Date(user.LastChatDate.seconds * 1000).toLocaleDateString("en-US") : ''} </Text>}
                                            onPress={() => onUserClick(user.id)}
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

