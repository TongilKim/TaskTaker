import React, { useState, useEffect } from 'react'
import { Button, Avatar, Card, } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { View, StyleSheet, Text, Modal, TouchableHighlight, TouchableWithoutFeedback, ScrollView, SafeAreaView } from "react-native";

export default function ReviewModal(props) {
    const [visible, setVisible] = useState(false);

    const onCloseClick = () => {
        setVisible(false);
        props.onReviewClick(false);
    }

    useEffect(() => {
        setVisible(props.visible);
    }, [props]);

    return (
        <TouchableHighlight>
            <Modal
                transparent={true}
                visible={visible}>
                <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                    <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                        <Card>
                            <View >
                                <View style={styles.userInfoContainer}>
                                    <Avatar.Image size={75} source={require('../../assets/avatar.jpg')} style={{ marginLeft: 15 }} />
                                    <View style={{}}>
                                        <Text>Tongil Kim</Text>
                                        <Text>Id: {props.clickedUserId}</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        <View style={{ padding: 10 }}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={15}
                                startingValue={4.5}
                                style={{ margin: 5 }}
                            />
                            <Text style={{ color: '#787878' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                            <Text style={{ alignSelf: 'flex-end', marginTop: 15 }}>05/Sep/2020</Text>
                        </View>
                        <Button onPress={onCloseClick} color="#F9D71C">Close</Button>
                    </View>
                </View>
            </Modal>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-evenly'
    },
});