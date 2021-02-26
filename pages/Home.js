import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, FlatList, Text } from 'react-native';
import { Card, Title, Searchbar, Chip, } from 'react-native-paper';
import data from "../data";
import PopularTaskList from '../components/Profile/PopularTaskList'



export default function Home(props) {
    const [filteredTaskList, setFilteredTaskList] = useState(null);
    const [mostPopularData, setMostPopularData] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [showTaskList, setShowTaskList] = useState(false);
    const taskList = ['Delivery', 'Delivery2', 'Shopping', 'Cleaning', 'Assemble', 'IKEA Assembly', 'Laundry', 'Moving'];

    useEffect(() => {
        setMostPopularData(data);
    }, []);

    renderList = list => {
        return <PopularTaskList list={list} />
    }
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

    }
    const onTaskNameClick = (taskName) => {
        props.navigation.navigate("SetUpTaskPlace");
        setTaskName('');
        setShowTaskList(false);
    }
    const onTaskChipClick = (taskName) => {

    }
    return (
        <View>
            <View style={{ alignItems: "center" }}>
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
            <View>
                <FlatList data={mostPopularData}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => renderList(item)}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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