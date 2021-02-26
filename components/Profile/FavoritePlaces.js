import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight, Modal, TouchableOpacity } from "react-native";
import { Card, Title, List, Divider, Searchbar, Button } from 'react-native-paper';
import citiesData from '../../cities.json';
import Firebase from '../../Firebase'

export default function FavoritePlaces(props) {
    const [cityName, setCityName] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [cities, setCities] = useState([]);
    const [favoritePlaces, setFavoritePlaces] = useState([]);
    const [showCityList, setShowCityList] = useState(false);
    const [showConfirmMsg, setShowConfirmMsg] = useState(false);

    const searchCityName = (val) => {
        setCityName(val);
        if (val.length > 0) {
            setShowCityList(true);
            let matches = citiesData.filter(e => {
                const regex = new RegExp(`^${val}`, 'gi');
                return e.city.match(regex);
            });
            setCities(matches);
        } else {
            setShowCityList(false);
        }

    }
    const onCityNameClick = (cityObj) => {
        setProvinceName(cityObj.province_name);
        setCityName(cityObj.city);
        setShowConfirmMsg(true);
        setShowCityList(false);
    }
    const handleModalClose = (response) => {
        if (response === 'YES') {

            if (favoritePlaces.filter(place => place.CityName === cityName).length > 0) {
                // already exist in your favorite list
            } else {
                Firebase.addFavoritePlaces(cityName, provinceName);
            }

        }
        setShowConfirmMsg(false);
    }
    const onDeleteClick = (id) => {
        Firebase.deleteFavoritePlace(id);
    }
    useEffect(() => {
        Firebase.getFavoritePlaces((placeList) => {
            setFavoritePlaces(placeList)
        })
    }, [])
    return (
        favoritePlaces ? <>
            <TouchableHighlight>
                <Modal
                    transparent={true}
                    visible={showConfirmMsg}>
                    <View style={{ backgroundColor: "#000000aa", justifyContent: 'center', flexDirection: 'column', flex: 1 }} >
                        <View style={{ backgroundColor: '#ffffff', margin: 20, padding: 20, borderRadius: 10 }}>
                            <View>
                                <Text style={{ alignSelf: 'center' }}>Would you like to add {<Text style={{ color: "#F9D71C", fontSize: 18 }}>{cityName}</Text>} to your Favorite Place list?</Text>
                            </View>
                            <Button onPress={() => handleModalClose('YES')} color="#F9D71C" style={{ marginTop: 20 }}>YES</Button>
                            <Button onPress={() => handleModalClose('NO')} color="#ECECEC" style={{ marginTop: 20 }}>NO</Button>
                        </View>
                    </View>
                </Modal>
            </TouchableHighlight>
            <View style={{ marginTop: '8%' }}>
                <Title style={{ textAlign: 'center' }}>Favorite Places</Title>
                <View style={{ alignItems: "center" }}>
                    <Searchbar
                        placeholder="Search City"
                        theme={{ colors: { primary: "#F9D71C" } }}
                        onChangeText={(val) => searchCityName(val)}
                        value={cityName}
                        style={styles.searchBar}
                    />
                    {
                        showCityList ? <FlatList
                            data={cities}
                            renderItem={({ item }) => {
                                return (
                                    <Card
                                        style={{ margin: 2, padding: 12 }}
                                        onPress={() => onCityNameClick(item)}
                                    >
                                        <Text>{item.city}</Text>
                                    </Card>
                                )
                            }}
                            keyExtractor={item => item.city}
                        /> : <></>
                    }

                </View>
                <Card style={{ marginTop: '5%' }}>
                    <List.Section >
                        {
                            favoritePlaces.map((place) => {
                                return (
                                    <TouchableOpacity key={place.id}>
                                        <List.Item title={`${place.CityName}, ${place.ProvinceName}`}

                                            left={() => <List.Icon size={50} icon="pin-outline" />}
                                            right={() => <TouchableOpacity onPress={() => onDeleteClick(place.id)}>
                                                {<List.Icon size={50} icon="delete" />}
                                            </TouchableOpacity>}
                                        />
                                        <Divider />
                                    </TouchableOpacity>
                                );

                            })
                        }
                    </List.Section>
                </Card>
            </View >
        </> : <></>
    )
}

const styles = StyleSheet.create({

    searchBar: {
        marginTop: '5%',
        width: 320,
        textAlign: 'center',
        borderRadius: 15,
    }
});