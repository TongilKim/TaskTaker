import React, {useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme, HelperText, ActivityIndicator } from 'react-native-paper';
import Firebase from '../../Firebase'
import emailValidator from 'email-validator'
import passwordValidator from 'password-validator'
import { connect } from 'react-redux'

function SignUp(props) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: props.route.params,
        confirm_password: '',
        secureTextIcon: true,
        confirm_secureTextIcon: true,
        isValidEmail: false,
        isValidPswd: false,
        hasEmailError: false,
        hasPswdError: false,
        hasComfirmPswdError: false,
        firebaseEmailErrorMsg: '',
        isLoading: false,
    });
    const { colors } = useTheme();
    let pswdSchema = new passwordValidator();
    pswdSchema
        .is().min(8)                                    // Minimum length 8
        .is().max(20)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces

    const emailInputChange = (val) => {
        if (emailValidator.validate(val)) {
            setData({
                ...data,
                email: val,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleConfirmPasswordChange = (val) => {
        if (data.password === val) {
            setData({
                ...data,
                isValidPswd: true,
                confirm_password: val
            })
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextIcon: !data.secureTextIcon
        });
    }
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextIcon: !data.confirm_secureTextIcon
        });
    }
    const handleSignUp = (email, password, confirmPassword, firstName, lastName, phoneNumber) => {
        if (!emailValidator.validate(email)) {
            setData({
                ...data,
                hasEmailError: true,
            })
            return;
        }
        if (!pswdSchema.validate(password)) {
            setData({
                ...data,
                hasPswdError: true,
            })
            return;
        }
        if (password !== confirmPassword) {
            setData({
                ...data,
                hasComfirmPswdError: true,
            })
            return;
        }
        else {
           
            setData({
                ...data,
                hasEmailError: false,
                hasPswdError: false,
                hasComfirmPswdError: false
            })
             Firebase.signUp(email, password, firstName, lastName, phoneNumber, 'https://placeimg.com/138/139/any');
            
            setData({
                ...data,
                isLoading: true
            });
            setTimeout(() => {
                if (Firebase.getErrorMsg().length > 0) {
                    if (Firebase.getErrorMsg() === 'email-in-use-error') {
                        setData({
                            ...data,
                            hasEmailError: true,
                            isLoading: false,
                            firebaseEmailErrorMsg: 'This is email is already exist!'
                        });
                    }
                }
                else {
                    setData({
                        ...data,
                        hasEmailError: false,
                        isLoading: false,
                        firebaseEmailErrorMsg: ''
                    });
                    const user = Firebase.getCurrentUserId();
                    props.signUp(user);
                }
            }, 2000);
        }
    }

    return data.isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>

    ) : (
            <View style={styles.container}>
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
                            <Text style={styles.text_footer}>Email</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20} />
                                <TextInput
                                    placeholder="Your Email"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => emailInputChange(val)}
                                />
                                {data.isValidEmail ? <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                /> : null}

                            </View>
                            <HelperText type="error" visible={data.hasEmailError}>
                                {data.firebaseEmailErrorMsg}
                            </HelperText>

                            <Text style={styles.text_footer}>First Name</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20} />
                                <TextInput
                                    placeholder="Your First Name"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text,
                                    }]}
                                    
                                    onChangeText={(val) => setData({ ...data, firstName: val })}
                                />
                            </View>

                            <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                            }]}>Last Name</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color={colors.text}
                                    size={20} />
                                <TextInput
                                    placeholder="Your Last Name"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text,
                                    }]}
                                    onChangeText={(val) => setData({ ...data, lastName: val })}
                                />
                            </View>

                            <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                            }]}>Password</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Password"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.secureTextIcon ? true : false}
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handlePasswordChange(val)}
                                />
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {data.secureTextIcon ?
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
                            <HelperText type="error" visible={data.hasPswdError}>
                                Password requires at least 8 length, uppercase, 2 digits without spaces.
                            </HelperText>
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>Confirm Password</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color={colors.text}
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Confirm Your Password"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.confirm_secureTextIcon ? true : false}
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                                />
                                <TouchableOpacity
                                    onPress={updateConfirmSecureTextEntry}
                                >
                                    {data.confirm_secureTextIcon ?
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
                            <HelperText type="error" visible={data.hasComfirmPswdError}>
                                Confirmed Password is wrong !
                            </HelperText>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    disabled={data.isValidEmail && data.isValidPswd && data.firstName.length > 0 && data.lastName.length > 0 ? false : true}
                                    style={styles.signUp}
                                    onPress={() => { handleSignUp(data.email, data.password, data.confirm_password, data.firstName, data.lastName, data.phoneNumber) }}
                                >
                                    <LinearGradient
                                        colors={['#F9D71C', '#e0c119']}
                                        style={styles.signUp}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: data.isValidEmail && data.isValidPswd && data.firstName.length > 0 && data.lastName.length > 0 ? '#fff' : '#F9D71C'
                                        }]}>Sign Up</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('SignIn')}
                                    style={[styles.signUp, {
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
        )
}
function mapStateToProps(state) {
    return {
        userId: state.userId
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signUp: (currentUserId) => dispatch({ type: 'LOGGED_IN', userId: currentUserId }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
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
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});