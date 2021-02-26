import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Avatar, Button, List, Divider } from 'react-native-paper';
import Firebase from '../../Firebase'
export default function ProfileEdit(props) {
    const [currentUserObj, setCurrentUserObj] = useState(null);
    useEffect(() => {
        Firebase.getCurrentUserObj((user) => {
            setCurrentUserObj(user[0])
        })
    }, [])

    return currentUserObj ? (
        <View style={{ marginTop: '8%' }}>
            <Title style={{ textAlign: 'center' }}>Account Information</Title>
            <Card style={styles.listContainer}>
                <List.Section>
                    <List.Item title="Email" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: '#F9D71C' }}>{currentUserObj.email}</Text>
                    </View>} />
                    <Divider />
                    <List.Item title="Name" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: '#F9D71C' }}>{currentUserObj.FirstName} {currentUserObj.LastName}</Text>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ChangeName")} />
                    <Divider />
                    <List.Item title="Phone Number" right={() => <View style={styles.propStyle}>
                        <Text style={{ alignItems: 'flex-start', marginRight: 40, fontSize: 15, color: '#F9D71C' }}>204-963-2200</Text>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ChangePhoneNumber")} />
                    <Divider />
                    <List.Item title="Password" right={() => <View style={styles.propStyle}>
                        <List.Icon icon="arrow-right" /></View>} onPress={() => props.navigation.navigate("ConfirmPasssword")} />
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