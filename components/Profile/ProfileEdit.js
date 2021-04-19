import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Avatar, Button, List, Divider } from 'react-native-paper';
import Firebase from '../../Firebase'
export default function ProfileEdit(props) {
    const [currentUserObj, setCurrentUserObj] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [textColor, setTextColor] = useState('');
    useEffect(() => {
        Firebase.getCurrentUserObj((user) => {
            if (props.route.params.mode === 'Tasker') {
                setFirstName(user[0].Tasker.firstName);
                setTextColor('#0b7fab');
            } else {
                setFirstName(user[0].FirstName);
                setTextColor('#F9D71C');
            }
            setCurrentUserObj(user[0]);
        })
    }, [])

    return currentUserObj ? (
        <View style={{ marginTop: '8%' }}>
            <Title style={{ textAlign: 'center' }}>Account Information</Title>
            <Card style={styles.listContainer}>
                <List.Section>
                    <List.Item title="Email" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: textColor }}>{currentUserObj.email}</Text>
                    </View>} />
                    <Divider />
                    <List.Item title="Name" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: textColor }}>{firstName}</Text>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ChangeName",{mode: props.route.params.mode === 'Tasker' ? 'Tasker' : 'Customer' })} />
                    <Divider />
                    <List.Item title="Phone Number" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: textColor }}>{currentUserObj.PhoneNum}</Text>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ChangePhoneNumber",{mode: props.route.params.mode === 'Tasker' ? 'Tasker' : 'Customer' })} />
                    <Divider />
                    <List.Item title="Password" right={() => <View style={styles.propStyle}>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ConfirmPasssword", {mode: props.route.params.mode === 'Tasker' ? 'Tasker' : 'Customer' })} />
                </List.Section>
            </Card>
        </View>
    ) : (<View></View>)
}



const styles = StyleSheet.create({
    propStyle: {
        flexDirection: "row",
        alignItems: 'center',
    },
    listContainer: {
        marginTop: '5%'
    }
});