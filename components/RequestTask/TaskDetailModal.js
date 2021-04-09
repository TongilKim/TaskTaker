import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-native-paper';
import { View, StyleSheet, Text, Modal } from "react-native";
import moment from 'moment';
import 'moment-timezone';

export default function TaskDetailModal(props) {
    const [visible, setVisible] = useState(false);
    const [taskDetail, setTaskDetail] = useState(null);

    const onCloseClick = () => {
        setVisible(false);
        props.onTaskDetailClick();
    }
    useEffect(() => {
        setVisible(props.visible);
        setTaskDetail(props.task);
    }, [props]);

    return taskDetail ? (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}>
                <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                    <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                        <Text style={{color: '#000',fontWeight: 'bold',fontSize: 23, alignSelf: 'center'}}>Task Details</Text>
                        <Card style={{marginTop: 20, padding: 20}}>
                            <Text style={styles.small_title}>Address</Text>
                        <Text>{taskDetail.streetAddress}</Text>
                        <Text style={styles.small_title}>Task Schedule</Text>
                        <Text>{moment(taskDetail.taskDate.toDate()).format("YYYY/MM/DD HH:mm A")}</Text>
                            {/* <Text>{console.log()}</Text> */}
                        
                        
                            <Text style={styles.small_title}>Description</Text>
                            <Text>{taskDetail.description}</Text>
                        
                        
                            <Text style={styles.small_title}>Cost Range</Text>
                            <Text style={{fontWeight: 'bold', marginBottom: 20}}>${taskDetail.minPrice} ~ ${taskDetail.maxPrice}</Text>
                        </Card>
                        
                            
                        
                        <Button onPress={onCloseClick} color="#F9D71C" style={{marginTop: 10}}>Close</Button>
                    </View>
                </View>
            </Modal>
    ) : (<></>)
}

const styles = StyleSheet.create({
   
    small_title: {
        color: '#05375a',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 20
    },
});