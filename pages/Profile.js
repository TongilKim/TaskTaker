import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Avatar, Button, List, Divider } from 'react-native-paper';
import Firebase from '../Firebase'
import * as firebase from 'firebase'
import { connect } from 'react-redux'


function Profile(props) {
    const [currentUserObj, setCurrentUserObj] = useState(null);

    const signOut = () => {
        Firebase.signOut();
        props.signOut();
    }
    
    const switchMode = () => {
        firebase.firestore().collection('users').doc(currentUserObj.id).get().then((snapshot) => {
            if (snapshot.data().Tasker !== undefined) {
                props.switchMode();
            } else {
                props.navigation.navigate("SignUpTasker");
            }
        });
    };

    useEffect(() => {
        Firebase.getCurrentUserObj((user) => {
            setCurrentUserObj(user[0])
        })
    }, [])
    return currentUserObj ? (
        <>
            <View style={styles.root}>
                <View style={styles.nameContainer}>
                    <Avatar.Image size={65} source={{ uri: currentUserObj.ProfileImg }} style={{marginLeft: 30}}/>
                    <Text style={styles.name}>{currentUserObj.FirstName}</Text>
                </View>
                <Button color="#F9D71C" icon="swap-horizontal" mode="outlined" onPress={() => switchMode()} style={{ backgroundColor: 'white', paddingVertical: 5, fontWeight: 500 }}>Switch to Tasker Mode</Button>
                <Card style={styles.listContainer}>
                    <List.Section>
                        <List.Item title="Profile Edit" right={() => <List.Icon icon="arrow-right" />} onPress={() => props.navigation.navigate("ProfileEdit",{mode: 'Customer'})} />
                        <Divider />
                        <List.Item title="Favorite Helper" right={() => <List.Icon icon="arrow-right" />} onPress={() => props.navigation.navigate("FavoriteHelper")} />
                        <Divider />
                        <List.Item title="Favorite Places" right={() => <List.Icon icon="arrow-right" />} onPress={() => props.navigation.navigate("FavoritePlaces")} />
                        <Divider />
                        <List.Item title="Wrote Review" right={() => <List.Icon icon="arrow-right" />} onPress={() => props.navigation.navigate("WroteReview")} />
                        <Divider />
                        <List.Item title="Received Review" onPress={() => props.navigation.navigate("ReceivedReview")} />
                        <Divider />
                        <List.Item title="Sign Out" onPress={() => signOut()} titleStyle={{textAlign: 'center',fontWeight: 'bold', fontSize: 20, color: '#F9D71C'}}/>
                    </List.Section>
                </Card>
            </View>
        </>
    ) : (<></>);
}

function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {

    return {
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        switchMode: () => dispatch({ type: 'SWITCH_MODE'}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    nameContainer: {
        paddingVertical: 15,
        flexDirection: "row",
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },
    name: {
        marginLeft: 17,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    listContainer: {
        marginTop: '5%'
    }
});