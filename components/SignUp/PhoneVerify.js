import React, { useState, useRef } from 'react'
import { View,TextInput,TouchableHighlight, StyleSheet,  Modal,  Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Title,  Button, Card, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PhoneVerify(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sendCodeBtn, setSendCodeBtn] = useState(false);
    const [verifyCodeSentBtn, setVerifyCodeSentBtn] = useState(false);
    const [verified, setVerified] = useState(false);
    const [code, setCode] = useState('');
    const [codeEditAble, setCodeEditAble] = useState(false);
    const [verificationId, setVerificationId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage,setModalMessage] = useState('');
    const recaptchaVerifier = useRef(null);

    const { colors } = useTheme();

    const handlePhoneNumChange = (val) => {
        setPhoneNumber(val);
        if (val.length > 14) {
            setSendCodeBtn(true);
        } else {
            setSendCodeBtn(false);
        }
    }
    const handleCodeChange = (val) => {
        setCode(val);
        if (val.length > 3) {
            setVerifyCodeSentBtn(true);
        } else {
            setVerifyCodeSentBtn(false);
        }
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
                result.user.delete(); // It's because new user object is created with phone number in the firabsase 
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
    const handleModalClose = () => {
        setShowModal(false);
        setModalMessage('');
    }
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
    return (
<View style={styles.container}>
    {!window.isRNWebView ? <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebase.app().options}
                    /> : <></>}
        <TouchableHighlight>
             <Modal
                transparent={true}
                visible={showModal}>
                <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                    <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                        <View>
                            <Text style={ modalMessage === 'Invalid verification code!' ? {color: 'red', alignSelf: 'center', fontSize: 15}:{color: 'black', alignSelf: 'center', fontSize: 15} }>{modalMessage}</Text>
                        </View>

                        <TouchableOpacity onPress={handleModalClose} style={[styles.sendBtn, { backgroundColor: '#F9D71C', marginTop: 20, width: '50%', alignSelf: 'center'}]}>
                            <Text style={{ color:'white', fontWeight: 'bold', textAlign: 'center'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableHighlight>
    <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up</Text>
    </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: 'white'
            }]}
        >
            <ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Phone number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="phone"
                            color={colors.text}
                            style={{marginTop: 10}}
                            size={20} />
                        <TextInputMask
                                    {...props}
                                    type={'custom'}
                                    options={{
                                        mask: '+1 999 999 9999'
                                    }}
                                    value={phoneNumber}
                                    onChangeText={(val) => handlePhoneNumChange(val)}
                                    placeholder="Your Phone Number"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                         />
                         <TouchableOpacity disabled={!sendCodeBtn} onPress={onClickSendCodeBtn} style={[styles.sendBtn, sendCodeBtn ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC'}]}>
                            <Text style={{ color:'white', fontWeight: 'bold'}}>Send Code</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text_footer}>Verify Code</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="check-circle"
                            color={colors.text}
                            style={{marginTop: 10}}
                            size={20} />
                        <TextInput
                            editable={codeEditAble}
                            placeholder="Verification Code"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleCodeChange(val)}
                        />
                        <TouchableOpacity disabled={!verifyCodeSentBtn} onPress={onClickVerifyBtn} style={[styles.sendBtn, verifyCodeSentBtn ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC',  color: 'white'}]}>
                            <Text style={{ color:'white', fontWeight: 'bold'}}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            disabled={!verified}
                            style={styles.nextBtn}
                            onPress={ () => props.navigation.navigate('SignUp', phoneNumber)}
                        >
                            <LinearGradient
                                colors={['#F9D71C', '#e0c119']}
                                style={styles.nextBtn}
                            >
                                <Text style={[styles.textSign, {
                                    color: verified ? '#fff' : '#F9D71C'
                                }]}>Next</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('SignIn')}
                            style={[styles.nextBtn, {
                                borderColor: '#F9D71C',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#F9D71C'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Animatable.View>
</View>
    );
}


const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 25
    },
   buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    nextBtn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    sendBtn: {
        fontSize: 14,
        padding: 10,
        borderRadius: 10,
    },
});