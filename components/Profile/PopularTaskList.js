import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function PopularTaskList(props) {

    return (

        <View>
            <TouchableOpacity style={styles.listContainer}>

                <Image source={props.list.image} style={{ width: 100, height: 100, borderRadius: 10 }} />
                <View style={styles.description}>
                    <Text style={{ marginTop: 15, fontSize: 13, color: '#737373' }}>
                        {props.list.location}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        {props.list.task}
                    </Text>
                    <Text style={{ marginTop: 8, fontSize: 20, fontWeight: "bold" }}>
                        ${props.list.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",

    },
    description: {
        alignItems: "center"
    }
})