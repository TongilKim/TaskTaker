import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Card, Avatar, Button, ActivityIndicator } from 'react-native-paper';
import Firebase from '../../Firebase';
import TaskDetailModal from './TaskDetailModal';
import { SafeAreaView } from 'react-native';

export default function PendingTask(props) {
    const [requestDetail, setRequestDetail] = useState(null);
    const [visibleModal, setVisible] = useState(false);
    const [visibleCancelledModal, setVisibleCancelledModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const renderTaskers = () => {
        return (
            <Card>
            <View style={styles.userInfoContainer}>
                <View>
                    <Avatar.Image size={50} source={require('../../assets/avatar.jpg')} style={{ alignSelf: 'center'}} />
                    <View>
                        <Text>Tongil Kim</Text>    
                    </View>
                </View>
                <View style={styles.userTextInfo}>
                    <Button icon="star" color="#F9D71C" style={{ alignSelf: 'flex-start', }}>
                        <Text style={{ color: "black" }}>4.8 (75)</Text>
                    </Button>
                    <Text>Since 07/Sep/2020</Text>
                </View>
            </View>
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <Text style={{fontStyle: 'italic'}} numberOfLines={2}>
                        Hello I wanna help you out asldfkj lksdflk jasldk jfls df ksadkjf lskjd flsk jdlfk jsl kf asdf asdf asd fa dfasd fa sdf asd fas f
                    </Text>
                </View>
                <View style={{  padding: 15,  }}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Suggested Task Date:</Text>
                        <Text style={[styles.suggestedTaskFont, Dimensions.get('window').width > 400 ? {} :{ paddingTop: 10, paddingBottom: 10}]}>2021-03-06 13:00PM</Text>
                    </View>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Suggested Task Cost:</Text>
                        <Text style={[styles.suggestedTaskFont]}>$ 10</Text>
                    </View>
                </View>
        </Card>
        );
    }
    const onCancelTaskClick = () => {
        setVisibleCancelledModal(true);
    }
    const onTaskDetailClick = () => {
        setVisible(!visibleModal);
    }
    const onConfirmModal = (val) => {
        console.log('hi')
        if (val === 'YES') {
            Firebase.deleteRequestedTask(props.route.params.taskID);
            setVisibleCancelledModal(false);
            setLoading(true);
            props.route.params.updateRequestTaskStatus();
            props.navigation.navigate("Home");
        } else {
            setVisibleCancelledModal(false);
        }
    }
    useEffect(() => {
        if (requestDetail === null) {
            async function call() {
                
                let request = await Firebase.getPendingRequestDetail(props.route.params.taskID);
                setRequestDetail(request);
            }
            call();
        }  

    }, [requestDetail]);
    return requestDetail && !loading ? (
        <>
            <TaskDetailModal visible={visibleModal} onTaskDetailClick={onTaskDetailClick} task={requestDetail} />

            <Modal
                transparent={true}
                visible={visibleCancelledModal}>
                <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                    <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                        <View>
                            <Text style={{color: 'black', alignSelf: 'center', fontSize: 15}}>Are you sure you want to cancel the request?</Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => onConfirmModal('YES')}  style={[styles.cancelModalCloseBtn, { backgroundColor: '#F9D71C', marginTop: 20, width: '50%', alignSelf: 'center'}]}>
                                <Text  style={{ color:'white', fontWeight: 'bold', textAlign: 'center'}}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onConfirmModal('NO')} style={[styles.cancelModalCloseBtn, { backgroundColor: '#F9D71C', marginTop: 20, width: '50%', alignSelf: 'center'}]}>
                                <Text   style={{ color:'white', fontWeight: 'bold', textAlign: 'center'}}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <SafeAreaView>
                <ScrollView>
                    <View style={{flex: 1}}>
                        <Animatable.View
                            animation="fadeInUp"
                            style={[styles.footer, {
                                backgroundColor: 'white'
                            }]}
                            >
                            <View style={styles.footer}>
                                <View style={styles.header}>
                                    <Text style={styles.text_header}>In Pending Request</Text>
                                    <Text style={styles.subText_header}>Your task is requested to <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{requestDetail.matchedUsersNum ? requestDetail.matchedUsersNum : '0'} </Text>{requestDetail.matchedUsersNum > 1 ? 'people' : 'person' }.</Text>
                                        <Text style={[styles.subText_header, {marginTop: 5}]}>Please select a tasker you want to work with.</Text>
                                </View>

                                <TouchableOpacity style={{marginTop: 30}} onPress={onTaskDetailClick}>
                                    <View style={styles.requestContainer}>
                                            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingRight: 10}}>
                                                <Text style={{ color: '#000', fontSize: 19, fontWeight: 'bold' }}>Your Task</Text>
                                                <Text style={{fontSize: 13, color: '#F9D71C', fontWeight: 'bold'}}>..Detail</Text>
                                            </View>
                                            <Text style={[styles.requestText, { paddingTop: 5, fontStyle: 'italic' }]} numberOfLines={1}>{ requestDetail.description}</Text>
                                    </View>
                                </TouchableOpacity>
                                    
                                <Card style={{marginTop: 20 }}>
                                        <Card.Content style={{ flexDirection: 'row' }}>
                                            <View style={{ alignItems: 'center', width: '50%'}}>
                                                <Text>Acceptance</Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>5</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', width: '50%'}}>
                                                <Text>Cheapest</Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>$ 10</Text>
                                            </View>
                                        </Card.Content>  
                                    </Card>
                                    
                                <View style={[styles.header, {marginTop: 20, marginBottom: 20}]}>
                                    <Text style={styles.text_header}>Peding Taskers</Text>
                                </View>
                                
                                    {renderTaskers()}
                                    
                                    <View>
                                        <Button onPress={onCancelTaskClick} mode="contained" color="#F9D71C" style={{ marginTop: 20 }}>
                                            Cancel Task
                                        </Button>
                                    </View>
                            </View>
                        </Animatable.View>
                    </View>    
                </ScrollView>
            </SafeAreaView>
        </>
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
    </View> 
        )
}


const styles = StyleSheet.create({
    suggestedTaskFont: {
        fontWeight: 'bold',
        fontSize: 16
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    userTextInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
        paddingBottom: 15
    },
    requestContainer: {
        padding: 10,
        width: '100%',
        paddingRight: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#F9D71C',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    requestText: {
        color: '#000',
        fontSize: 17,
        alignSelf: 'flex-start'
    },
    button: {
        
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subText_header: {
        color: '#000',
        fontSize: 17,
        marginTop: 10,
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
        
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    cancelModalCloseBtn: {
        fontSize: 14,
        padding: 10,
        borderRadius: 10,
    },
});
