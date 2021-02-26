import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Avatar, Button, List, Divider, Modal, Portal, Provider } from 'react-native-paper';
import FavoriteHelperModal from './FavoriteHelperModal'

export default function FavoriteHelper(props) {
    const [visibleModal, setVisible] = useState(false);
    const [clickedUserId, setClickedUserId] = useState(null);

    const onListClick = (id) => {
        setVisible(!visibleModal);
        setClickedUserId(id);
    }

    return (
        <>
            <FavoriteHelperModal visible={visibleModal} onListClick={onListClick} clickedUserId={clickedUserId} />
            <View style={{ marginTop: '8%' }} >
                <Title style={{ textAlign: 'center' }}>Favorite Helper</Title>
                <Card style={{ marginTop: '5%' }}>
                    <List.Section >
                        <List.Item title="Tongil Kim"
                            description="Lodon, Ontario"
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/avatar.jpg')}
                                style={{ marginRight: '12%' }} />}
                            right={() => <List.Icon icon="star-outline" />}
                            onPress={() => onListClick('#11111')}
                        />
                        <Divider />
                        <List.Item title="Thanos"
                            description="Toronto, Ontario"
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/thanos.jpg')}
                                style={{ marginRight: '12%' }} />}
                            right={() => <List.Icon icon="star" />}
                            onPress={() => onListClick('#22222')}
                        />
                        <Divider />
                        <List.Item title="John Mayer"
                            description="Saint John, New Brunswick"
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/avatar2.jpg')}
                                style={{ marginRight: '12%' }} />}
                            right={() => <List.Icon icon="star-outline" />}
                            onPress={() => onListClick('#33333')}
                        />
                    </List.Section>
                </Card>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

});