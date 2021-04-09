import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, KeyboardAvoidingView, Modal } from 'react-native'
import { Button, Checkbox } from 'react-native-paper';
import Firebase from '../../../Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignUpExtraInfo(props) {
    const [userData, setUserData] = useState(null);
    const [description, setDescription] = useState('');
    const [completedDescription, setCompletedDescription] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checkBoxes, setCheckBoxes] = useState([
        { id: 1, name: 'Public', isChecked: false },
        { id: 2, name: 'Bicycle', isChecked: false },
        { id: 3, name: 'Van', isChecked: false },
        { id: 4, name: 'Motor Cycle', isChecked: false },
        { id: 5, name: 'SUV', isChecked: false },
        { id: 6, name: 'Truck', isChecked: false },
        { id: 7, name: 'Regular Car', isChecked: false},
    ])

    const onClickCheckBox = (checkBoxId) => {
        let updatedCheckbox = checkBoxes.map(item => {
            if (item.id == checkBoxId) {
                  return { ...item, isChecked: !item.isChecked }; 
              }
              return item; // else return unmodified item 
            });
        setCheckBoxes(updatedCheckbox);

    }
    const onTextChange = (val) => {
        setDescription(val);
        if (val.split(' ').length > 15) {
            setCompletedDescription(true);
        } else {
            setCompletedDescription(false);
        }
    }
    onClickCloseModal = () => {
        console.log('close')
        setShowModal(false);
        props.navigation.navigate('Home');
    }
    const onClickRegisterBtn = () => {
        let checkedBox = checkBoxes.map(checkBox => {
            if (checkBox.isChecked) {
                return { name: checkBox.name };
            }
        });
        // Remove all the undefined values in the array
        userData.availableVehicle = checkedBox.filter(( val ) => {
            return val !== undefined;
         });;
        userData.description = description;
        Firebase.signUpNewTasker(userData);

        setShowModal(true);
    }
    
    useEffect(() => {
        if (userData === null)
            setUserData(props.route.params);      
    }, []);
    

   return userData ? (
        
       <View style={styles.container}>
           <TouchableHighlight>
                <Modal
                    transparent={true}
                    visible={showModal}>
                   <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                       <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                           <View>
                               <Text style={{color: 'black', alignSelf: 'center', fontSize: 15}}> Successfully Applied The Registration! </Text>
                           </View>

                           <TouchableOpacity onPress={() => onClickCloseModal()}  style={styles.modalCloseBtnContainer}>
                                <Text style={{ color:'white', fontWeight: 'bold', textAlign: 'center'}}>Close</Text>
                           </TouchableOpacity>
                        </View>
                   </View>    
                </Modal>
           </TouchableHighlight>


           <KeyboardAvoidingView>
           <KeyboardAwareScrollView>
            <View style={styles.header}>
                <Text style={styles.text_header}>Extra information about yourself</Text>
                <Text style={styles.subText_header}>Get more possibility to match with your customer by introducing yourself in more detail</Text>
           </View>
           
           
           <View style={{ paddingHorizontal: 20}}>
                <Text style={[styles.text_header, {fontSize: 25, marginBottom: 15}]}>About Yourself</Text>
                <TextInput
                    style={{
                        height: 150,
                        borderRadius: 10,
                        padding: 15,
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                        borderWidth: 1,
                    }}
                    autoCorrect={false}
                    textAlignVertical='top'
                    placeholder='Please describe yourself with more than 15 letters at least'
                    multiline={true}
                    value={description}
                    onChangeText={(val) => onTextChange(val)}
               />
               
               <Text style={[styles.text_header, {fontSize: 25, marginBottom: 15, marginTop: 20}]}>Transportation (optional)</Text>
               <View style={styles.checkboxContainer}>
                    {
                       checkBoxes.map(checkBox => {
                           return (<View key={checkBox.id} style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center'}} >
                                    <Checkbox.Android
                                        status={checkBox.isChecked ? 'checked': 'unchecked'}
                                        onPress={() => { onClickCheckBox(checkBox.id) }}
                                        uncheckedColor={'#fff'}
                                        color={'#fff'}
                                    />
                               <Text style={styles.label}>{checkBox.name}</Text>
                           </View>);
                       })
                   }
                </View>

                 <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', marginBottom: 20 }}>
                    <Button onPress={() => {props.navigation.goBack()}} mode="contained" style={[styles.uploadBtn, {width: '40%', backgroundColor: '#ECECEC'}]}>Go Back</Button>
                    <Button onPress={onClickRegisterBtn} disabled={!completedDescription} mode="contained" style={[styles.uploadBtn, {width: '40%'}]}>Register</Button>
                </View>       
            </View>   
               </KeyboardAwareScrollView>
               </KeyboardAvoidingView>
        </View>  // Container End
    ) : (<></>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C',
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',        
        paddingHorizontal: 20,
        paddingBottom: 30,
        marginTop: 30,
        marginBottom: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        
    },
    subText_header: {
        color: '#fff',
        fontSize: 17,
        marginTop: 20,
        fontWeight: 'bold'
    },

    checkboxContainer: {
        flexDirection: 'column',
        maxHeight: 140,
        maxWidth: 140,
        flexWrap: 'wrap',
      },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    uploadBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        color: '#000',
        borderRadius: 5,
        marginTop: 20,
        padding: 3,
        width: '65%',
        textAlign: 'center',
    },
    modalCloseBtnContainer: {
        backgroundColor: '#F9D71C',
        marginTop: 20,
        width: '50%',
        alignSelf: 'center',
        fontSize: 14,
        padding: 10,
        borderRadius: 10
    }
})
