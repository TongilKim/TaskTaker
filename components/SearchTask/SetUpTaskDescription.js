import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, ProgressBar, } from 'react-native-paper';

export default function SetUpTaskDescription(props) {
    const [description, setDescription] = useState('');
    const [completedDescription, setCompletedDescription] = useState(false);
    const [newTask, setNewTask] = useState(null);
    
    const onClickNextBtn = () => {
        newTask.description = description;
        props.navigation.navigate('TaskPrice', {updateRequestTaskStatus: () => props.route.params.updateRequestTaskStatus(), newTask: newTask});
    }
    const onTextChange = (val) => {
        setDescription(val);
        if (val.split(' ').length > 15) {
            setCompletedDescription(true);
        } else {
            setCompletedDescription(false);
        }
    }

    useEffect(() => {
        if(newTask === null)
        setNewTask(props.route.params.newTask);
    });


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.footer, {
                    backgroundColor: 'white'
                }]}>
                    <ProgressBar progress={0.5} color='#F9D71C' />
                    <View style={styles.footer}>
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Task Description </Text>
                        </View>
                    </View>
                    <TextInput
                        style={{
                            height: 150,
                            padding: 10,
                            borderColor: '#F9D71C',
                            borderWidth: 1
                        }}
                        autoCorrect={false}
                        textAlignVertical="top"
                        placeholder='Please describe your task with more than 15 letters at least'
                        multiline={true}
                        value={description}
                        onChangeText={(val) => onTextChange(val)}
                    />
                    <Button onPress={onClickNextBtn} disabled={!completedDescription} mode="contained" style={[styles.nextBtn, completedDescription ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>NEXT</Button>
                </View>
            </View>
        </ScrollView>
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
        fontSize: 25,
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
})