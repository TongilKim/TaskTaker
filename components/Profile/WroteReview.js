import React, { useState, useEffect } from 'react'
import { View, } from "react-native";
import { Card, Title, Avatar, List, Divider } from 'react-native-paper';
import ReviewModal from './ReviewModal'

export default function WroteReview() {
    const [visibleModal, setVisible] = useState(false);
    const [clickedUserId, setClickedUserId] = useState(null);

    const onReviewClick = (id) => {
        setVisible(!visibleModal);
        setClickedUserId(id);
    }

    return (
        <>
            <ReviewModal visible={visibleModal} onReviewClick={onReviewClick} clickedUserId={clickedUserId} />
            <View style={{ marginTop: '8%' }}>
                <Title style={{ textAlign: 'center' }}>Wrote Review</Title>
                <Card style={{ marginTop: '5%' }}>
                    <List.Section >
                        <List.Item title="Tongil Kim was amazing helper"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/avatar.jpg')}
                                style={{ marginRight: '2%' }} />}
                            right={() => <List.Icon icon="book-open-outline" />}
                            onPress={() => onReviewClick("#11111")}
                        />
                        <Divider />
                        <List.Item title="Tongil Kim was amazing helper"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/avatar2.jpg')}
                                style={{ marginRight: '2%' }} />}
                            right={() => <List.Icon icon="book-open-outline" />}
                            onPress={() => onReviewClick("#222222")}
                        />
                        <Divider />
                        <List.Item title="Tongil Kim was amazing helper"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            left={() => <Avatar.Image size={50}
                                source={require('../../assets/thanos.jpg')}
                                style={{ marginRight: '2%' }} />}
                            right={() => <List.Icon icon="book-open-outline" />}
                            onPress={() => onReviewClick("#333333")}
                        />
                    </List.Section>
                </Card>
            </View>
        </>
    )
}
