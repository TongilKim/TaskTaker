import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchStreetAddress(props) {

    const onClickAddress = (data) => {
        props.route.params.updateAddress(data);
        props.navigation.goBack();
    }
    const onClickCancel = () => {
        props.navigation.goBack();
    }
    return (
        <>
        
            <View style={styles.container}>
            
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: 'white'
                    }]}
                >
                    
                    <View style={styles.footer}>
                   
                        <View style={styles.header}>
                            <Text style={styles.text_header}>Search your address</Text>
                            <KeyboardAvoidingView>
                            <View style={styles.action}>
                                <GooglePlacesAutocomplete
                                    placeholder='ex) 1240 Bay Street'
                                    onPress={(data) => onClickAddress(data)}
                                    query={{
                                        key: 'AIzaSyBSaQaPnTWnI1nRrsXZ5iqmAhIurpf18eM',
                                        language: 'en',
                                        components: 'country:ca',
                                    }}
                                    styles={{
                                        predefinedPlacesDescription: {
                                            color: '#F9D71C',
                                        },
                                        textInput: {
                                            height: 38,
                                            color: '#5d5d5d',
                                            fontSize: 16,
                                        }
                                    }}
                                />
                                </View>
                                </KeyboardAvoidingView>
                            </View>
                            
                    </View>
                    <Button mode="contained" onPress={onClickCancel} style={styles.nextBtn}>CANCEL</Button>
                    
                    </Animatable.View>
                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C',
        paddingTop: '10%'
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
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 25
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#05375a',
    },
});