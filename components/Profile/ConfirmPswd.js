import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Text, TouchableOpacity } from "react-native";
import { Card, Title, Button, useTheme, HelperText } from 'react-native-paper';
import Firebase from '../../Firebase'
import * as firebase from 'firebase';
import Feather from 'react-native-vector-icons/Feather';

export default function ConfirmPswd(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [pswdErrorMsg, setPswdErrorMsg] = useState('');
    const [hasPswdError, setHasPswdError] = useState(false);
    const [okBtnStatus, setOkBtnStatus] = useState(false);

    const { colors } = useTheme();


    useEffect(() => {
        Firebase.getCurrentUserObj((user) => {
            setEmail(user[0].email)
        })
    }, [])

    const onPressPswdVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    const onChangePswd = val => {
        setPassword(val);
        if (password.length > 5) {
            setOkBtnStatus(true);
        } else {
            setOkBtnStatus(false);
        }
    }

    const onPressOk = () => {
        const credential = firebase.auth.EmailAuthProvider.credential(
            email, password);
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                props.navigation.navigate("ChangePassword");
                setPassword('');
                okBtnStatus(false);
                setHasPswdError(false);
                setPswdErrorMsg('');
            })
            .catch(error => {
                setHasPswdError(true);
                setPassword('');
                setPswdErrorMsg('password is invalid');
            });
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Title style={styles.title}>Enter your current password</Title>

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} value={email} editable={false} />
            </View>

            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.inputContainer}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}
                />

                <TextInput style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={onChangePswd}
                    secureTextEntry={passwordVisible ? true : false}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={onPressPswdVisible}
                >
                    {passwordVisible ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>
            <HelperText type="error" visible={hasPswdError}>
                {pswdErrorMsg}
            </HelperText>
            <Button
                disabled={!okBtnStatus}
                mode="contained"
                style={[styles.textButton, okBtnStatus ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}
                onPress={onPressOk}>OK</Button>
        </View>
    )
}



const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    title: {
        marginTop: 40,
        marginLeft: 10,
    },
    nameInput: {
        marginTop: 20
    },
    text_footer: {
        color: '#000',
        fontSize: 18,
        marginTop: 25,
        marginLeft: 15,
        marginBottom: 10
    },
});