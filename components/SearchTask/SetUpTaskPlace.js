import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity,  Platform } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme, ProgressBar } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import 'moment-timezone';

export default function SetUpTaskPlace(props) {
    const [verified, setVerified] = useState(false);
    const { colors } = useTheme();
    const [unitNumber, setUnitNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [cityName, setCityName] = useState('');
    const [date, setDate] = useState(null);
   

    const hideDatePicker = () => {
        setOpenDatePicker(false);
      };
    
    const handleConfirm = (date) => {
    setDate(date);
    // setDate(moment(date).format("YYYY/MM/DD HH:mm A"));
    hideDatePicker();
    };
    
    const onClickNextBtn = () => {
        let newTask = {unitNumber: unitNumber, streetAddress: streetAddress, cityName: cityName, postalCode: postalCode, taskDate: date }
        props.navigation.navigate("TaskDescription",{updateRequestTaskStatus: () => props.route.params.updateRequestTaskStatus(), newTask: newTask});
    }
  
    const onClickStreetAddress = () => {
        props.navigation.navigate("SearchAddress", {
            updateAddress: (val) => updateAddress(val)
        });
    }
    const updateAddress = (addressObj) => {
        let streetName = addressObj.description;
        let cityName = addressObj.structured_formatting.secondary_text;
        setCityName(cityName);
        setStreetAddress(streetName);
    }
    const onClickScheduleBtn = (type) => {
        
        setOpenDatePicker(true);
    }

    useEffect(() => {
        if (streetAddress.length > 2 && postalCode.length > 2 && date !== null) {
            setVerified(true);
        } else {
            setVerified(false);
        }
    }, [streetAddress, postalCode, date]);


    return (
        <>
        <DateTimePickerModal
            isVisible={openDatePicker}
            mode={'datetime'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            
        />
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
                >
                    <ProgressBar progress={0.3} color='#F9D71C' />
                    <View style={styles.footer}>
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Task Location</Text>
                        </View>

                        <Text style={styles.small_title}>Street Address</Text>
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
                        <Text style={styles.small_title}>Apt/Unit# (Optional)</Text>
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
                        <Text style={styles.small_title}>Postal Code</Text>
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

                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=> onClickScheduleBtn()}>
                                <LinearGradient
                                    colors={['#F9D71C', '#e0c119']}
                                    style={styles.scheduleBtn}
                                >
                                    <Text style={styles.scheduleBtnText}>Schedule Task</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <Button onPress={onClickNextBtn} disabled={!verified} mode="contained" style={[styles.nextBtn, verified ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>NEXT</Button>
                    </View>
                </Animatable.View>
            </View>
        </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    button: {
        
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    scheduleBtn: {
        width: Platform.OS === 'ios' ? 160 : 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },
    scheduleBtnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    small_title: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 40
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#05375a',
    },
});
