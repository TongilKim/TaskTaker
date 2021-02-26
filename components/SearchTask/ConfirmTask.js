import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Button, ProgressBar,List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Firebase from '../../Firebase'
import Modal from 'react-native-modal';

export default function ConfirmTask(props) {
    const [streetAddress, setStreetAddress] = useState('');
    const [description, setDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [minCost, setMinCost] = useState('');
    const [maxCost, setMaxCost] = useState('');
    const [confirmationMsgVisible, setConfirmationMsgVisible] = useState(false);

    const onClickConfirmBtn = () => {
        Firebase.addTask(props.route.params);
        setConfirmationMsgVisible(true);
    }
    const closeModal = () => {
        setConfirmationMsgVisible(false);
        props.navigation.navigate("Home");
    };

    useEffect(() => {
       let newTask = props.route.params;
       newTask.unitNumber.length > 0 ? setStreetAddress(newTask.unitNumber + " - " + newTask.streetAddress + ", " + newTask.postalCode) : setStreetAddress(newTask.streetAddress + ", " + newTask.postalCode);
        setDescription(newTask.description);
        setMinCost(newTask.minPrice);
        setMaxCost(newTask.maxPrice);
        setTaskDate(newTask.taskDate);
    });

    return (
        <>
        <View style={{ flex: 1 }}>
                    <Modal isVisible={confirmationMsgVisible} >
                        <View style={styles.modalContainer}>
                            <List.Icon icon="account-edit" style={{ alignSelf: 'center' }} size={80} />
                            <Text style={{ textAlign: 'center', paddingBottom: 30, fontSize: 20 }}>New Task is Requested successfully! </Text>
                            <TouchableWithoutFeedback>
                                <Text style={styles.textButton} onPress={closeModal}>OK</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
                </View>

        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.footer, {
                    backgroundColor: 'white'
                }]}>
                    <ProgressBar progress={1.0} color='#F9D71C' />
                    <View style={styles.footer}>
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Task Confirmation</Text>
                        </View>

                        <Text style={styles.small_title}>Address</Text>
                        <View style={styles.textInputContainer}>
                            <FontAwesome
                                name="map-marker"
                                color='#F9D71C'
                                style={{marginRight: 10}}
                                size={20} />

                            <TextInput
                                editable={false}
                                multiline={true}
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={streetAddress}
                            />
                        </View>

                        <Text style={styles.small_title}>Task Scedule</Text>
                        <View style={styles.textInputContainer}>
                            <FontAwesome
                                name="calendar-check-o"
                                color='#F9D71C'
                                style={{marginRight: 10}}
                                size={20} />

                            <TextInput
                                editable={false}
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                autoCapitalize="none"
                                value= {taskDate.toString()}
                            />
                           
                        </View>

                        <Text style={styles.small_title}>Description</Text>
                        <View style={styles.textInputContainer}>
                            <FontAwesome
                                name="pencil"
                                color='#F9D71C'
                                style={{marginRight: 10}}
                                size={20} />

                            <TextInput
                                editable={false}
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                multiline={true}
                                autoCapitalize="none"
                                value={description}
                            />
                        </View>

                        <Text style={styles.small_title}>Task Cost Range</Text>
                        <View style={styles.priceRangeContainer}>
                            <View style={{ marginRight: 30 }}>
                                <Text style={styles.small_title}>Min Cost</Text>
                                <View style={styles.rangeSection}>
                                    <FontAwesome
                                        name="dollar"
                                        color="#F9D71C"
                                        size={15} />
                                    <TextInput
                                        value={minCost}
                                        editable={false}
                                        keyboardType='numeric'
                                        style={[styles.textInput, {
                                            color: '#000',
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            fontSize: 17
                                        }]} />
                                </View>
                            </View>

                            <View>
                                <Text style={styles.small_title}>Max Cost</Text>
                                <View style={styles.rangeSection}>
                                    <FontAwesome
                                        name="dollar"
                                        color="#F9D71C"
                                        size={15} />
                                    <TextInput
                                        value={maxCost}
                                        editable={false}
                                        keyboardType='numeric'
                                        style={[styles.textInput, {
                                            color: '#000',
                                            textAlign: 'center',
                                            fontWeight: '700',
                                            fontSize: 17
                                        }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Button onPress={onClickConfirmBtn} mode="contained" style={styles.confirmationBtn}>Confirm</Button>
                </View>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40
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
    confirmationBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,

        padding: 3,
        width: '95%',
        textAlign: 'center',
    },
    small_title: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 40
    },
    textInputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textButton: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        width: '95%',
        textAlign: 'center',
    },
    priceRangeContainer: {
        marginTop: -15,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    rangeSection: {
        flex: 1,
        borderBottomWidth: 3,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: '#000',
        fontWeight: '700',
        fontSize: 15
    },
    modalContainer: {
        backgroundColor: "#fff",
        margin: 50,
        padding: 40,
        borderRadius: 10
    },
})