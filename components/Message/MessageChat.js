
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../Firebase'

export default function MessageChat({ route }) {
    const { selectedUserMessages, currentUserObj } = route.params;
    const [messages, setMessages] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    function handleSend(newMsg) {
        Firebase.getSelectedUserObj((obj) => {
            delete obj.id;
            Firebase.addMsg(newMsg, obj);
        })
        setMessages((previouseMsg) => GiftedChat.append(previouseMsg, newMsg));
    }
    useEffect(() => {
        setMessages(JSON.parse(selectedUserMessages));
        setCurrentUser(currentUserObj);
    }, [])
    return messages && currentUser ? (
        <>
            <GiftedChat messages={messages} user={{ _id: currentUser[0].id, avatar: currentUser[0].ProfileImg, name: currentUser[0].FirstName }} onSend={handleSend} />
        </>
    ) : (<></>)
}
