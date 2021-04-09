import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TextInputMask } from 'react-native-masked-text'

export default function SignUpTasker(props) {
    const { colors } = useTheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [cityName, setCityName] = useState('');

    const updateAddress = (addressObj) => {
        let streetName = addressObj.description;
        let cityName = addressObj.structured_formatting.secondary_text;
        setCityName(cityName);
        setStreetAddress(streetName);
    }
    const onClickStreetAddress = () => {
        props.navigation.navigate("SearchAddress", {
            updateAddress: (val) => updateAddress(val)
        });
    }
    const onClickNextBtn = () => {
        let newTaskerObj = {
            cityName: cityName,
            unitNumber: unitNumber,
            streetAddress: streetAddress,
            postalCode: postalCode,
            birthDate: birthDate,
            firstName: firstName.charAt(0).toUpperCase()+firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase()+lastName.slice(1)
        }
        props.navigation.navigate("SignUpProfilePic",newTaskerObj);
    }

    useEffect(() => {
        if(firstName.length > 2 && lastName.length > 2 && birthDate.length > 9 && streetAddress.length > 2 && postalCode.length > 6) {
            setVerified(true);
        } else {
            setVerified(false);
        }
    },[firstName,lastName,birthDate,streetAddress,postalCode])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.text_header}>Tasker Sign Up</Text>
            </View>
            <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.footer}>
                        <Text style={[styles.text_footer, {color: colors.text,}]}>First Name</Text>
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
                                    
                                    onChangeText={(val) => setFirstName(val)}
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
                                    
                                    onChangeText={(val) => setLastName(val)}
                                />
                        </View>
                        <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                        }]}>Brith</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="birthday-cake"
                                color={colors.text}
                                style={{marginTop: 10}}
                                    size={20} />
                                <TextInputMask
                                        {...props}
                                        type={'datetime'}
                                        options={{
                                            format: 'DD/MM/YYYY'
                                        }}
                                        value={birthDate}
                                        onChangeText={(val) => setBirthDate(val)}
                                        placeholder="DD/MM/YYYY"
                                        placeholderTextColor="#666666"
                                        style={[styles.textInput, {
                                            color: colors.text,
                                            marginTop: Platform.OS === 'ios' ? 12 : -12,
                                        }]}
                            />
                        </View>

                        <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                        }]}>Address</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="map-marker"
                                color='#F9D71C'
                                size={20} />

                            <TextInput
                                placeholder="Enter Your Street Address"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                value={streetAddress}
                                onFocus={() => onClickStreetAddress()}
                            />
                        </View>

                        <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                        }]}>Apt/Unit#</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="map-marker"
                                color='#F9D71C'
                                size={20} />

                            <TextInput
                                placeholderTextColor="#F9D71C"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}

                                onChangeText={(val) => setUnitNumber(val)}
                                autoCapitalize="none"
                            />
                        </View>

                        <Text style={[styles.text_footer, {
                                color: colors.text,
                                marginTop: 35
                        }]}>Postal Code</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="map-marker"
                                color='#F9D71C'
                                size={20} />
                            <TextInputMask
                                placeholder="Enter Your Postal Code"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                value={postalCode}
                                onChangeText={(val) => setPostalCode(val.toUpperCase())}
                                type={'custom'}
                                options={{
                                    mask: 'A9A 9A9'
                                }}
                            />
                        </View>
                        <Button onPress={onClickNextBtn} disabled={!verified} mode="contained" style={[styles.nextBtn, verified ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>NEXT</Button>
                </View>
                </KeyboardAwareScrollView>
                </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    nextBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
        padding: 3,
        width: '95%',
        textAlign: 'center',
    },
});