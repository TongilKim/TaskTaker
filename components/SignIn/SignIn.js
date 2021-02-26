import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme, HelperText, ActivityIndicator } from 'react-native-paper';
import Firebase from '../../Firebase'
import { connect } from 'react-redux'
import emailValidator from 'email-validator'


function SignIn(props) {
    const [data, setData] = React.useState({
        email: 'kkimtt1234@gmail.com',
        password: 'Prime!23',
        secureTextEntry: true,
        isValidEmail: false,
        isValidPassword: true,
        currentUserId: null,
        hasEmailError: false,
        hasPswdError: false,
        isLoading: false,
    });

    const { colors } = useTheme();


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
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    function loginHandle(email, password) {
        Firebase.login(email, password);
        setData({
            ...data,
            isLoading: true
        });
        setTimeout(() => {

            if (Firebase.getErrorMsg().length > 0) {
                if (Firebase.getErrorMsg() === 'email-error') {
                    setData({
                        ...data,
                        hasEmailError: true,
                        isLoading: false
                    });
                }
                if (Firebase.getErrorMsg() === 'password-error') {
                    setData({
                        ...data,
                        hasPswdError: true,
                        isLoading: false
                    });
                }

            }
            else {
                const user = Firebase.getCurrentUserId();
                props.signIn(user);
                setData({
                    ...data,
                    hasPswdError: false,
                    hasEmailError: false,
                    isLoading: false
                });
            }
        }, 2000)
    }
    return data.isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>

    ) : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Sign In</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
                >
                    <View style={styles.footer}>
                        <Text style={styles.text_footer}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color={colors.text}
                                size={20} />
                            <TextInput
                                placeholder="Your Email"
                                defaultValue="kkimtt1234@gmail.com"
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
                            Email is Wrong!
                        </HelperText>

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
                                defaultValue="Prime123"
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                            >
                                {data.secureTextEntry ?
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
                            Password is wrong!
                    </HelperText>

                        <View style={styles.button}>
                            <TouchableOpacity
                                // disabled={data.isValidEmail && data.isValidPassword ? false : true}
                                style={styles.signIn}
                                onPress={() => { loginHandle(data.email, data.password) }}
                            >
                                <LinearGradient
                                    colors={['#F9D71C', '#e0c119']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: data.isValidEmail && data.isValidPassword ? '#fff' : '#F9D71C'
                                    }]}>Sign In</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('PhoneVerify')}
                                style={[styles.signIn, {
                                    borderColor: '#F9D71C',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#F9D71C'
                                }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        signIn: (currentUserId) => dispatch({ type: 'LOGGED_IN', userId: currentUserId }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

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
    signIn: {
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