import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, FlatList, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Searchbar, Chip, } from 'react-native-paper';
import data from "../data";
import PopularTaskList from '../components/Profile/PopularTaskList'
import Firebase from '../Firebase'
import * as firebase from 'firebase';
import moment from 'moment';
import 'moment-timezone';

export default function Home(props) {
    const [filteredTaskList, setFilteredTaskList] = useState(null);
    const [mostPopularData, setMostPopularData] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [showTaskList, setShowTaskList] = useState(false);
    // const [currentUserId, setCurrentUserId] = useState(null);
    const [taskRequests, setTaskRequests] = useState(null);

    const taskList = ['Delivery', 'Delivery2', 'Shopping', 'Cleaning', 'Assemble', 'IKEA Assembly', 'Laundry', 'Moving'];


    const updateRequestTaskStatus = () => {
        let currentUserId = Firebase.getCurrentUserId();
            
             firebase.firestore().collection('users')
            .doc(currentUserId)
            .collection('requestTask')
            .limit(5)
            .get().then(query => {
                if (query.size > 0) { // Requests available
                    let requests = [];
                    firebase.firestore().collection('users').doc(currentUserId).collection('requestTask').get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let endTime = new Date(doc.data().createdAt.toDate()).getTime() + 43200000; // task created time - 12 hours
                            let leftTimeInMillSeconds = endTime - new Date().getTime();
                            let leftHours = Math.floor((leftTimeInMillSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            let leftMins = Math.floor((leftTimeInMillSeconds % (1000 * 60 * 60)) / (1000 * 60));
                            
                            requests.push({data: doc.data(), id: doc.id, timeLeft: leftHours + ":" + leftMins});
                        });
                    }).then(() => {
                        setTaskRequests(requests);
                        
                    });
                } else { // Any requests are not available
                    setTaskRequests(null);
                    
                }
            });
    };
    

    const renderList = list => {
        return (<PopularTaskList list={list} onTaskNameClick={() => onTaskNameClick() }/>);
    };
    const searchTask = (val) => {
        setTaskName(val);
        if (val.length > 0) {
            setShowTaskList(true);
            let matches = taskList.filter(e => {
                const regex = new RegExp(`^${val}`, 'gi');
                return e.match(regex);
            });
            setFilteredTaskList(matches);
        } else {
            setShowTaskList(false);
        }

    };
    const onTaskNameClick = (taskName) => {
        props.navigation.navigate("SetUpTaskPlace", {updateRequestTaskStatus: () => updateRequestTaskStatus()});
        setTaskName('');
        setShowTaskList(false);
    };
    const onPendingTaskClick = (taskRequest) => {
        props.navigation.navigate("PendingTask", {taskID : taskRequest.id, updateRequestTaskStatus: () => updateRequestTaskStatus()});
    };

    useEffect(() => {
        updateRequestTaskStatus();
        setMostPopularData(data);
    }, []);
    return (
        <View>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    {
                        taskRequests ? (
                            taskRequests.map((taskRequest, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onPendingTaskClick(taskRequest)}>
                                        <View  style={styles.requestContainer}>
                                            <Text style={[styles.requestText, {padding: 8, paddingBottom: 0}]} numberOfLines={1}>{taskRequest.data.description}</Text>
                                            <View style={{ flexDirection: 'row', padding: 10,  alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                <View style={{ padding:4, borderRadius: 10, flexWrap: 'wrap',  backgroundColor: '#fff'}}>
                                                    <Text style={[styles.requestText, { fontSize: 14, color: '#F9D71C', alignSelf: 'center' }]}>pending</Text>
                                                </View>
                                                <View>
                                                    <Text style={[styles.requestText, { fontSize: 13 }]}>{taskRequest.timeLeft} mins left</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (  <></>)
                    }
                <Searchbar
                    placeholder="Search Task"
                    theme={{ colors: { primary: "#F9D71C" } }}
                    onChangeText={(val) => searchTask(val)}
                    value={taskName}
                    style={styles.searchBar}
                />
                {
                    showTaskList ? <FlatList
                        data={filteredTaskList}
                        renderItem={({ item }) => {
                            return (
                                <Card
                                    style={{ margin: 2, padding: 12, width: '100%' }}
                                    onPress={() => onTaskNameClick(item)}
                                >
                                    <Text>{item}</Text>
                                </Card>
                            )
                        }}
                        keyExtractor={item => item}
                    /> : <></>
                }
            </View>
            <View style={styles.categoryContainer}>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Delivery')}>Delivery</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Shopping')}>Shopping</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Cleaning')}>Cleaning</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Assemble')}>Assemble</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('IKEA_Assemble')}>IKEA Assembly</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Laundry')}>Laundry</Chip>
                <Chip mode="outlined" style={styles.chip} onPress={() => onTaskNameClick('Moving')}>Moving</Chip>
            </View>

            <View style={{ marginLeft: 20 }}>
                <Title>Popular Tasks</Title>
            </View>

            {/* Popular tasks Flatlist */}
            
                <SafeAreaView>
                    <FlatList
                    data={mostPopularData}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => renderList(item)}
                    keyboardShouldPersistTaps="always"
                    />
                </SafeAreaView>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    requestContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '89%',
        paddingRight: 5,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ECECEC',
        borderRadius: 15,
        backgroundColor: '#F9D71C',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    requestText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
    categoryContainer: {
        paddingVertical: 35,
        paddingHorizontal: 35,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        zIndex: 1
        // backgroundColor: 'red'
    },
    chip: {
        marginBottom: 20,
        marginRight: 10
    },
    logoContainer: {
        marginTop: '10%'
    },
    searchBar: {
        marginTop: '10%',
        width: 320,
        borderRadius: 15,
    }
});