import React, { Component } from 'react'

import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCGgb_ozhtiHiltzwWZx0kgVCw_0puYoQE",
    authDomain: "taskhelper-ceb38.firebaseapp.com",
    databaseURL: "https://taskhelper-ceb38.firebaseio.com",
    projectId: "taskhelper-ceb38",
    storageBucket: "taskhelper-ceb38.appspot.com",
    messagingSenderId: "696012795527",
    appId: "1:696012795527:web:1d7d0e4cab2a913ed51222",
    measurementId: "G-SX9Y5L98LQ"
};

class Firebase {
    currentUserId = null;
    msgUserList = null;
    selectedUserId = null;
    msgUsersRef = null;
    errorMsg = '';
    currentUserObj = null;
    currentUserEmail = null;

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    login(email, password) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((signedUser) => {

                if (signedUser) {

                    this.errorMsg = '';
                    this.currentUserId = signedUser.user.uid;
                    this.currentUserEmail = email;
                    // return the user list who had conversation with in the past.

                    //this.msgUsersRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('msgUsers');
                    firebase.firestore().collection('users').doc(this.currentUserId).get().then((doc) => {
                        this.currentUserObj = doc.data();
                    })

                    // return all the user list in the database
                     this.msgUsersRef = firebase.firestore().collection('users');

                    this.msgUsersRef.onSnapshot(snapshot => {
                        let userLists = [];

                        snapshot.forEach(doc => {
                            const newData = doc.data();
                            if(doc.id !== this.currentUserId)
                            userLists.push({ id: doc.id, ...newData, });
                        })
                        this.msgUserList = userLists;
                    })
                }
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    this.errorMsg = 'email-error'
                }
                if (error.code === 'auth/wrong-password') {
                    this.errorMsg = 'password-error'
                }
            });
    }
    signUp(email, password, firstName, lastName, phoneNumber, profileImg) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((createdUser) => {
                this.errorMsg = '';
                this.currentUserId = createdUser.user.uid;
                let userObj = { FirstName: firstName.charAt(0).toUpperCase()+firstName.slice(1),
                                LastName: lastName.charAt(0).toUpperCase()+lastName.slice(1), 
                                PhoneNum: phoneNumber, 
                                ProfileImg: profileImg }
                this.currentUserObj = userObj;
                firebase.firestore().collection('users').doc(createdUser.user.uid).set(userObj);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    this.errorMsg = 'email-in-use-error';
                }
            });
    }
    signOut() {
        firebase.auth().signOut()
            .then(() => console.log('User signed out!'));;
    }
    addMsg(newMsg, selectedUserObj) {
        let senderMsgRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('msgUsers').doc(this.selectedUserId).collection('chats');
        let receiverMsgRef = firebase.firestore().collection('users').doc(this.selectedUserId).collection('msgUsers').doc(this.currentUserId).collection('chats');
        senderMsgRef.add(newMsg[0]);
        receiverMsgRef.add(newMsg[0]);

        firebase.firestore().collection('users').doc(this.currentUserId).collection('msgUsers').doc(this.selectedUserId).set(selectedUserObj);
        firebase.firestore().collection('users').doc(this.selectedUserId).collection('msgUsers').doc(this.currentUserId).set(this.currentUserObj);
    }
    addFavoritePlaces(city, province) {
        let favoritePlaceRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('favoritePlaces');
        favoritePlaceRef.add({ CityName: city, ProvinceName: province });
    }
    addTask(task) {
        let requestTaskRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('requestTask');
        requestTaskRef.add(task);
    }
    updateName(enteredFirstName, enteredLastName) {
        firebase.firestore().collection('users').doc(this.currentUserId)
            .update({ FirstName: enteredFirstName.charAt(0).toUpperCase()+enteredFirstName.slice(1), LastName: enteredLastName.charAt(0).toUpperCase()+enteredLastName.slice(1) });
    }
    updatePhoneNum(newPhoneNum) {
        firebase.firestore().collection('users').doc(this.currentUserId)
            .update({ PhoneNum: newPhoneNum });
    }
    setSelectedUserId(id) {
        this.selectedUserId = id;
    }
    getFirebaseConfig() {
        return this.firebaseConfig;
    }
    getCurrentUserId() {
        return firebase.auth().currentUser.uid;
    }
    getMsgUserList() {
        return this.msgUserList;
    }
    getErrorMsg() {
        return this.errorMsg;
    }
    getSelectedUserObj(callback) {
        let selectedUserRef = firebase.firestore().collection('users');

        selectedUserRef.onSnapshot(snapshot => {
            let selectedUserArry = [];

            snapshot.forEach(doc => {
                const newData = doc.data();

                if (doc.id === this.selectedUserId)
                    selectedUserArry.push({ id: doc.id, ...newData, });
            })
            callback(selectedUserArry[0])
        })
    }
    getFavoritePlaces(callback) {
        let favoritePlacesRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('favoritePlaces')

        favoritePlacesRef.onSnapshot(snapshot => {
            let favoritePlacesArry = [];

            snapshot.forEach(doc => {
                const newData = doc.data();
                favoritePlacesArry.push({ id: doc.id, ...newData, });
            })
            callback(favoritePlacesArry)
        })
    }
    getCurrentUserObj(callback) {
        let currentUserRef = firebase.firestore().collection('users');

        currentUserRef.onSnapshot(snapshot => {
            let currentUserArry = [];
            snapshot.forEach(doc => {
                const newData = doc.data();
                
                if (doc.id === this.currentUserId)
                    currentUserArry.push({ id: doc.id, email: this.currentUserEmail, ...newData, });
            })
            callback(currentUserArry)
        })
    }
    getMessages(callback) {

        let msgRef = firebase.firestore().collection('users').doc(this.currentUserId).collection('msgUsers').doc(this.selectedUserId).collection('chats');
        msgRef.onSnapshot(querySnapshot => {

            const messageFirestore = querySnapshot.docChanges().filter(({ type }) => type === 'added').map(({ doc }) => {
                const message = doc.data();

                if (Object.keys(message).length === 0)
                    return { ...message }

                return { ...message, createdAt: message.createdAt.toDate() }
            });
            messageFirestore.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            callback(messageFirestore)
        })
    }
    deleteFavoritePlace(id) {
        firebase.firestore().collection('users').doc(this.currentUserId).collection('favoritePlaces').doc(id).delete();
    }
}

export default new Firebase();
