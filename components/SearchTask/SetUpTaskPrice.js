import { max, min } from 'moment';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { Button, ProgressBar, } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function SetUpTaskPrice(props) {
    const [newTask, setNewTask] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [completedPriceSetUp, setCompletedPriceSetUp] = useState(false);

    const onClickNextBtn = () => {
        newTask.minPrice = minPrice;
        newTask.maxPrice = maxPrice;
        props.navigation.navigate('TaskConfirm', {updateRequestTaskStatus: () => props.route.params.updateRequestTaskStatus(), newTask: newTask});
    }
    
    useEffect(() => {
        if(newTask === null)
        setNewTask(props.route.params.newTask);
        
        if(minPrice && maxPrice.length > 0 && parseInt(maxPrice) > parseInt(minPrice))
            setCompletedPriceSetUp(true);
        else
         setCompletedPriceSetUp(false);

    },[minPrice,maxPrice]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={[styles.footer, {
                    backgroundColor: 'white'
                }]}>
                    <ProgressBar progress={0.7} color='#F9D71C' />
                    <View style={styles.footer}>
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Cost Range</Text>
                        </View>
                        <View style={styles.priceRangeContainer}>
                            <View>
                                <Text style={styles.small_title}>Min Cost</Text>
                                <View style={styles.rangeSection}>
                                    <FontAwesome
                                        name="dollar"
                                        color="#F9D71C"
                                        size={15} />
                                    <TextInput
                                        keyboardType='numeric'
                                        style={[styles.textInput, {
                                            color: '#000'
                                        }]}
                                        onChangeText={(val) => setMinPrice(val)}
                                         />
                                        
                                </View>
                            </View>

                            <View>
                                <Text style={styles.small_title}>Max Cost</Text>
                                <View style={styles.rangeSection}>
                                    <FontAwesome
                                        name="dollar"
                                        color="#F9D71C"
                                        size={15} />
                                    <TextInput
                                        keyboardType='numeric'
                                        style={[styles.textInput, {
                                            color: '#000'
                                        }]} 
                                        onChangeText={(val) => setMaxPrice(val)}
                                        />
                                </View>
                            </View>
                        </View>
                    </View>

                    <Button onPress={onClickNextBtn} disabled={!completedPriceSetUp} mode="contained" style={[styles.nextBtn, completedPriceSetUp ? { backgroundColor: '#F9D71C' } : { backgroundColor: '#ECECEC' }]}>NEXT</Button>
                </View>
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25,
    },
    rangeSection: {
        flex: 1,
        borderBottomWidth: 3,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    nextBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 20,
        padding: 3,
        width: '95%',
        textAlign: 'center',
    },
    small_title: {
        color: '#05375a',
        fontSize: 18,
        textAlign: 'center'
    },
    priceRangeContainer: {
        alignItems: 'flex-start',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    textInput: {
        flex: 1,
        color: '#05375a',
        fontWeight: '600',
        textAlign: 'center'
    },
})