import React, { useState, useRef } from 'react'
import { View, StyleSheet, TouchableHighlight, Modal, Text, TouchableOpacity } from "react-native";
import { Title, TextInput, Button, Card } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';
import Firebase from '../../Firebase'



export default function ChangePhoneNum(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const [verifyCodeSentBtn, setVerifyCodeSentBtn] = useState(false);
    const [sendCodeBtn, setSendCodeBtn] = useState(false);
    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState('');
    const [codeEditAble, setCodeEditAble] = useState(false);
    const [showVerifiedMsg, setShowVerifiedMsg] = useState(false);
    const [verificationId, setVerificationId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const recaptchaVerifier = useRef(null);

    // Function to be called when requesting for a verification code
    const onClickSendCodeBtn = () => {

        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then((result) => {
                setVerificationId(result);
                setModalMessage('Verification code sent!');
                setShowModal(true);
                setCodeEditAble(true);
            })
            .catch((error) => {
                props.navigation.goBack();
            })
    };
    const handleCodeChange = (val) => {
        setCode(val);
        if (val.length > 5) {
            setVerifyCodeSentBtn(true);
        } else {
            setVerifyCodeSentBtn(false);
        }
    }
    const handlePhoneNumChange = (val) => {
        setPhoneNumber(val);
        if (val.length > 14) {
            setSendCodeBtn(true);
        } else {
            setSendCodeBtn(false);
        }
    }
    const handleModalClose = () => {
        setShowVerifiedMsg(false);
        setShowModal(false);
    }
    const onClickOkBtn = () => {
        props.navigation.navigate("ProfileEdit");
    }
    const onClickVerifyBtn = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );

        firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
                Firebase.updatePhoneNum(phoneNumber);
                result.user.delete();
                setModalMessage('Verified Successfully!'); 
                setVerified(true);
                setShowModal(true);
            })
            .catch(function (error) {
                setModalMessage('Invalid verification code!')
                setShowModal(true);
                setVerified(false);
            })
    };
    return (
        <>

            <TouchableHighlight>
                <Modal
                    transparent={true}
                    visible={showModal}>
                    <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                        <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                            <View>
                                <Text style={ modalMessage === 'Invalid verification code!' ? {color: 'red', alignSelf: 'center', fontSize: 15}:{color: 'black', alignSelf: 'center', fontSize: 15} }>{modalMessage}</Text>
                            </View>
                            <TouchableOpacity onPress={handleModalClose} style={[styles.closeBtn, { backgroundColor: '#F9D71C', marginTop: 20, width: '50%', alignSelf: 'center'}]}>
                            <Text style={{ color:'white', fontWeight: 'bold', textAlign: 'center'}}>Close</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableHighlight>

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {!window.isRNWebView ? <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebase.app().options}
                /> : <></>}
                <Title style={styles.title}>Change Your Phone Number</Title>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 2}}>
                        <TextInput style={styles.textInput}
                            placeholder="Phone number"
                            underlineColor="transparent"
                            theme={{ colors: { primary: '#F9D71C' } }}
                            value={phoneNumber}
                            onChangeText={(val) => handlePhoneNumChange(val)}
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    type={'custom'}
                                    options={{
                                        mask: '+1 999 999 9999'
                                    }}
                                />
                            }
                        />
                    </View>
                    <TouchableOpacity disabled={!sendCodeBtn} onPress={onClickSendCodeBtn} style={[styles.sendBtn, sendCodeBtn ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC'}]}>
                        <Text style={{color: 'white', fontWeight: 'bold'}} >Send Code</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 4 }}>
                        <TextInput style={styles.textInput}
                            editable={codeEditAble}
                            underlineColor="transparent"
                            theme={{ colors: { primary: '#F9D71C' } }}
                            placeholder="Code number"
                            onChangeText={(val) => handleCodeChange(val)} />
                    </View>
                    <TouchableOpacity disabled={!verifyCodeSentBtn} onPress={onClickVerifyBtn} style={[styles.verifyBtn, verifyCodeSentBtn ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>
                        <Text style={{color: 'white', fontWeight: 'bold'}} >Verify</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={onClickOkBtn} disabled={!verified} color="#F9D71C" mode="contained" style={[styles.okBtn, verified ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>OK</Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        margin: 10,
        paddingRight: 5,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F9D71C',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    textInput: {
        backgroundColor: '#fff',
        height: 50,
    },
    title: {
        marginTop: 40,
        marginLeft: 10
    },
    nameInput: {
        marginTop: 20
    },
    sendBtn: {
        fontSize: 14,
        backgroundColor: '#F9D71C',
        padding: 10,
       borderRadius: 10
    },
    verifyBtn: {
        fontSize: 14,
        borderRadius: 5,
        padding: 10
    },
    okBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
        padding: 3,
        width: '95%',
        textAlign: 'center',
    },
    closeBtn: {
        fontSize: 14,
        padding: 10,
        borderRadius: 10,
    },
});