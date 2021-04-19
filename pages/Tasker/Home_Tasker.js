import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TextInputMask } from 'react-native-masked-text'

export default function HomeTasker() {
    const { colors } = useTheme();
    let taskRequests = [{description: 'Hello this is the description of the task. I would like to ask you about delivering my food', timeLeft: '11:25'}]
    return (
        <View style={styles.container}>
             <View style={styles.header}>
                    <Text style={styles.text_header}>Available Tasks</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.footer}>
                {
                        taskRequests ? (
                            taskRequests.map((taskRequest, index) => {
                                return (
                                    <TouchableOpacity key={index}>
                                        <View style={styles.taskContainer}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: '100%', padding: 10 }}>
                                                <View style={{ padding:4, borderRadius: 10, flexWrap: 'wrap',  backgroundColor: '#fff'}}>
                                                    <Text style={[styles.taskContainerText, { fontSize: 14, color: '#0b7fab', alignSelf: 'center' }]}>Delivery</Text>
                                                </View>
                                                <View style={{padding:4, borderRadius: 5, flexWrap: 'wrap',  backgroundColor: '#fff'}}>
                                                    <Text style={[styles.taskContainerText, { fontSize: 17, color: '#0b7fab', alignSelf: 'center' }]}>{taskRequest.timeLeft} mins left</Text>
                                                </View>
                                            </View>

                                            <Text style={[styles.taskContainerText, { alignSelf: 'flex-start', padding: 8, fontFamily: 'italic' }]} numberOfLines={2}>{taskRequest.description}</Text>
                                            
                                            <View style={styles.acceptanceAndCostContainer}>
                                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                    <Text style={[styles.taskContainerText, { fontSize: 16, color: '#0b7fab' }]}>Task Cost</Text>
                                                    <Text style={[styles.taskContainerText, { fontSize: 16, color: '#0b7fab', alignSelf: 'center', fontWeight: '900' }]}>$5</Text>
                                                </View>

                                                <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                                                    <Text style={[styles.taskContainerText, { fontSize: 16, color: '#0b7fab' }]}>Acceptances</Text>
                                                    <Text style={[styles.taskContainerText, { fontSize: 16, color: '#0b7fab', alignSelf: 'center', fontWeight: '900' }]}>15</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (  <></>)
                    }
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        paddingTop: '10%',
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    taskContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        paddingRight: 5,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: '#ECECEC',
        borderRadius: 15,
        backgroundColor: '#0b7fab',
        flexWrap: 'wrap',
    },
    taskContainerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
    acceptanceAndCostContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 6,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
});