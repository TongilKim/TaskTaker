import React, { useState, useEffect, useCallback, useRef } from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../Firebase'
import * as firebase from 'firebase';


export default function MessageChat({ route, navigation }) {
    const { selectedUserMessages, currentUserObj, selectedUserId } = route.params;
    const [messages, setMessages] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const currentMsgLengthRef = useRef(messages);
    const msgRef = firebase.firestore().collection('users').doc(currentUserObj[0].id).collection('msgUsers').doc(selectedUserId).collection('chats').orderBy('createdAt', 'desc');
    
    
    const handleSend = (newMsg) => {
        Firebase.getSelectedUserObj((obj) => {
            delete obj.id;
            currentMsgLengthRef.current = messages.length+1;
            Firebase.addMsg(newMsg, obj, messages.length+1);
        })
        setMessages(GiftedChat.append(messages, newMsg));
       
    };
    
    useEffect(() => {

        if (messages === null) {
            setMessages(JSON.parse(selectedUserMessages));
            setCurrentUser(currentUserObj);
        }
       
    
        const subscription = msgRef.onSnapshot(querySnapshot => {
           const messageFirestore = querySnapshot.docs.map((doc, index) => {
               if (doc.data() !== undefined) {
                    const message = doc.data();
                    if (Object.keys(message).length === 0) {
                        return { ...message };
                    } else {
                        return { ...message, createdAt: message.createdAt.toDate(), };
                    };
                }
                
           });
           
           
             setMessages(messageFirestore);
        })
       
        const unsubscribe = navigation.addListener('blur', () => {
           
            if(currentMsgLengthRef.current === null)
                Firebase.updateLastMsgLength(JSON.parse(selectedUserMessages).length);
            else
                Firebase.updateLastMsgLength(currentMsgLengthRef.current);
            
            // unsubscribe the onSnapshot ( firebase realtime listener )
            subscription();
            route.params.updateUserMsgStatus();
           
        }, [currentMsgLengthRef]);
        return unsubscribe;
    },[]);

    return messages && currentUser ? (
        <>
            <GiftedChat messages={messages} user={{ _id: currentUser[0].id, avatar: currentUser[0].ProfileImg, name: currentUser[0].FirstName }} onSend={handleSend} />
        </>
    ) : (<></>)
}
