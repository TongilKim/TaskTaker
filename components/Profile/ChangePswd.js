import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { Card, Title, Button, HelperText, useTheme, List } from 'react-native-paper';
import passwordValidator from 'password-validator'
import * as firebase from 'firebase';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

export default function ChangePswd(props) {
    const { colors } = useTheme();
    let pswdSchema = new passwordValidator();
    pswdSchema
        .is().min(8)                                    // Minimum length 8
        .is().max(20)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces

    const [newPswd, setNewPswd] = useState('');
    const [confirmNewPswd, setConfirmNewPswd] = useState('');
    const [pswdErrorMsg, setPswdErrorMsg] = useState('');
    const [hasPswdError, setHasPswdError] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [okBtnStatus, setOkBtnStatus] = useState(false);
    const [btnColor, setBtnColor] = useState('');
   
    const validatePswd = () => {
        if (newPswd !== confirmNewPswd) {
            setPswdErrorMsg('Entered password is not matched.');
            setHasPswdError(true);
            return;
        }
        if (!pswdSchema.validate(newPswd)) {
            setPswdErrorMsg('Password requires at least 8 length, uppercase, 2 digits without spaces.');
            setHasPswdError(true);
            return;
        }
        else {
            firebase.auth().currentUser.updatePassword(newPswd);
            setModalVisible(true);
            return;
        }
    }
    const handleNewPswdChange = (val) => {
        setNewPswd(val);
        if (val.length > 7 && confirmNewPswd.length > 7) {
            setOkBtnStatus(true);
        } else {
            setOkBtnStatus(false);
        }
    }
    const handleConfirmNewPswdChange = (val) => {
        setConfirmNewPswd(val);
        if (val.length > 7 && newPswd.length > 7) {
            setOkBtnStatus(true);
        } else {
            setOkBtnStatus(false);
        }
    }
    const onPressNewPswdVisible = () => {
        setPasswordVisible(!passwordVisible);
    }
    const onPressConfirmPswdVisible = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }
    const closeModal = () => {
        setModalVisible(false);
        setPswdErrorMsg('');
        setConfirmNewPswd('');
        setNewPswd('');
        props.navigation.navigate("ProfileEdit");
    };

    useEffect(() => {
        if (props.route.params.mode === 'Tasker') {
            setBtnColor('#0b7fab');
        } else {
            setBtnColor('#F9D71C');
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Title style={styles.title}>Change Your Password</Title>
            <View style={styles.inputContainer}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput style={styles.textInput}
                    placeholder="New Password"
                    value={newPswd}
                    onChangeText={(val) => handleNewPswdChange(val)}
                    secureTextEntry={passwordVisible ? true : false}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={onPressNewPswdVisible}
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

            <View style={styles.inputContainer}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}
                />

                <TextInput style={styles.textInput}
                    placeholder="Confirm New Password"
                    value={confirmNewPswd}
                    onChangeText={(val) => handleConfirmNewPswdChange(val)}
                    secureTextEntry={confirmPasswordVisible ? true : false}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={onPressConfirmPswdVisible}
                >
                    {confirmPasswordVisible ?
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
                style={[styles.textButton, okBtnStatus ? { backgroundColor: btnColor } : { backgroundColor: '#ECECEC' }]}
                onPress={validatePswd}>OK</Button>
            <View style={{ flex: 1 }}>
                <Modal isVisible={isModalVisible} >
                    <View style={styles.modalContainer}>
                        <List.Icon icon="account-edit" style={{ alignSelf: 'center' }} size={80} />
                        <Text style={{ textAlign: 'center', paddingBottom: 30, fontSize: 20 }}>Password is edited successfully! </Text>
                        <TouchableWithoutFeedback>
                            <Text style={styles.textButton} onPress={closeModal}>OK</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    textButton: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        width: '95%',
        textAlign: 'center',
    },
    modalContainer: {
        backgroundColor: "#fff",
        margin: 50,
        padding: 40,
        borderRadius: 10
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 40,
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
        marginLeft: 5
    },
    nameInput: {
        marginTop: 20
    },

});