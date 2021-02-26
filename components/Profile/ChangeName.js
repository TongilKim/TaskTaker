import React, { useState, useEffect, useMemo } from 'react'
import { View, StyleSheet, TextInput, TouchableWithoutFeedback,TouchableHighlight, Text, TouchableOpacity } from "react-native";
import { Card, Title, List } from 'react-native-paper';
import Firebase from '../../Firebase'
import Modal from 'react-native-modal';

export default function ChangeName(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [okBtnStatus, setOkBtnStatus] = useState(false);

    const onClickOkBtn = () => {
        Firebase.updateName(firstName, lastName);
        setModalVisible(true);
    }
    const handleFirstNameChange = (val) => {
        setFirstName(val);
        if (firstName.length > 1 && lastName.length > 1) {
            setOkBtnStatus(true);
        } else {
            setOkBtnStatus(false);
        }
    }
    const handleLastNameChange = (val) => {
        setLastName(val);
        if (firstName.length > 1 && lastName.length > 1) {
            setOkBtnStatus(true);
        } else {
            setOkBtnStatus(false);
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        setFirstName('');
        setLastName('');
        props.navigation.navigate("ProfileEdit");
    };

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Title style={styles.title}>Change your name</Title>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 4 }}>
                        <TextInput style={styles.textInput} placeholder="Enter your first name" value={firstName} onChangeText={(val) => handleFirstNameChange(val)} />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 4 }}>
                        <TextInput style={styles.textInput} placeholder="Enter your last name" value={lastName} onChangeText={(val) => handleLastNameChange(val)} />
                    </View>
                </View>
                <TouchableOpacity disabled={!okBtnStatus} onPress={onClickOkBtn} style={[styles.textButton, okBtnStatus ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>
                    <Text style={{textAlign: 'center'}}>OK</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Modal isVisible={isModalVisible} >
                        <View style={styles.modalContainer}>
                            <List.Icon icon="account-edit" style={{ alignSelf: 'center' }} size={80} />
                            <Text style={{ textAlign: 'center', paddingBottom: 30, fontSize: 15, }}>Name is edited successfully! </Text>
                            <TouchableOpacity style={styles.clsoeBtn} onPress={closeModal}>
                                <Text style={{textAlign: 'center'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
           
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        margin: 50,
        padding: 40,
        borderRadius: 10
    },
    inputContainer: {
        flexDirection: 'row',
        margin: 10,
        paddingRight: 5,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textInput: {
        height: 50,
    },
    title: {
        marginTop: 40,
        marginLeft: 5
    },
    nameInput: {
        marginTop: 20
    },
    textButton: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        textAlign: 'center',
    },
    clsoeBtn: {
        fontSize: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F9D71C', 
        width: '95%',
        alignSelf: 'center'
    },
});