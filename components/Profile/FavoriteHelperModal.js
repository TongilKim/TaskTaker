import React, { useState, useEffect } from 'react'
import { Portal, Button, Avatar, Card, Title, Paragraph, List, Divider } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { View, StyleSheet, Text, Modal, TouchableHighlight, ScrollView } from "react-native";
export default function FavoriteHelperModal(props) {
    const [visible, setVisible] = useState(false);

    const onCloseClick = () => {
        setVisible(false);
        props.onListClick(false);
    }
    useEffect(() => {
        setVisible(props.visible);
    }, [props]);

    function renderReviews() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Avatar.Image size={40} source={require('../../assets/avatar.jpg')} style={{ marginLeft: 15 }} />
                    <View>
                        <Text style={{ marginLeft: 15 }}>Tongil Kim</Text>
                        <Button icon="star" color="#F9D71C" style={{ marginTop: -5 }}>
                            <Text style={{ color: "black", fontSize: 10 }}>4.8 (75)</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={15}
                        startingValue={2.5}
                        style={{ margin: 5 }}
                    />
                    <Text style={{ color: '#787878' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
                    <Text style={{ alignSelf: 'flex-end' }}>05/Sep/2020</Text>
                </View>
            </View>
        )
    }
    return (
        <TouchableHighlight >
            <Modal
                transparent={true}
                visible={visible}>
                <ScrollView>
                    <View style={{ backgroundColor: "#000000aa", flex: 1 }} >
                        <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                            <Card>
                                <View style={styles.userInfoContainer}>
                                    <View>
                                        <Avatar.Image size={75} source={require('../../assets/avatar.jpg')} style={{ marginLeft: 15 }} />
                                        <View style={styles.ratingContainer}>
                                            <Button icon="star" color="#F9D71C" style={{ alignSelf: 'flex-start', }}>
                                                <Text style={{ color: "black" }}>4.8 (75)</Text>
                                            </Button>
                                            <Text>Since 07/Sep/2020</Text>
                                        </View>
                                    </View>
                                    <View style={styles.userTextInfo}>
                                        <Text>Tongil Kim</Text>
                                        <Text>(30/Male)</Text>
                                        <Text>Id: {props.clickedUserId}</Text>

                                    </View>
                                </View>
                                <View>
                                    <Button mode="contained" color="#fff">
                                        request Task
                                    </Button>
                                    <Button mode="contained" color="#F9D71C" style={{ marginTop: 15 }}>
                                        Add favorite
                                    </Button>
                                </View>
                            </Card>
                            <List.Accordion style={{ marginTop: 20 }} title="Self Description" titleStyle={{ color: 'black' }}>
                                <Paragraph>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Paragraph>
                            </List.Accordion>


                            <Card style={{ marginTop: 20, padding: 7 }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <Title style={{ fontSize: 14 }}>Completed tasks:</Title>
                                    <Text style={{ fontSize: 14 }}>20</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <Title style={{ fontSize: 14 }}>Completed tasks this month:</Title>
                                    <Text style={{ fontSize: 14 }}>5</Text>
                                </View>
                            </Card>

                            <Title style={{ marginTop: 20 }}>View Reviews</Title>


                            <List.AccordionGroup >
                                <List.Accordion title="Moving" id="1" titleStyle={{ color: 'black' }}>
                                    <View>{renderReviews()}</View>
                                    <View>{renderReviews()}</View>
                                </List.Accordion>
                                <Divider />
                                <List.Accordion title="Assembly" id="2" titleStyle={{ color: 'black' }}>
                                    <View>{renderReviews()}</View>
                                    <View>{renderReviews()}</View>
                                    <View>{renderReviews()}</View>
                                </List.Accordion>
                                <Divider />
                                <List.Accordion title="Delivery" id="3" titleStyle={{ color: 'black' }}>
                                    <View>{renderReviews()}</View>
                                </List.Accordion>
                            </List.AccordionGroup>

                            <Button onPress={onCloseClick} color="#F9D71C">Close</Button>

                        </View>

                    </View>
                </ScrollView>
            </Modal>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    textButton: {
        fontSize: 20,
        backgroundColor: '#BADA55',
        borderRadius: 5,
        padding: 7,
        width: 100,
        textAlign: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    userTextInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    }
})