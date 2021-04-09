import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UploadPicture from '../../CommonComponents/UploadPicture';

export default function SignUpIdPic(props) {
    const [userData, setUserData] = useState(null);
   
    useEffect(() => {
          
        if (userData === null){
            setUserData(props.route.params);
        }
    }, []);

    return userData ? (
        
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.text_header}>ID Verification</Text>
                    <Text style={styles.subText_header}>Please upload your identification document such as driver license, or passport.</Text>
            </View>

            <UploadPicture userObj={userData} uploadPictureType='IdPicture' nextNavigateScreen='SignUpIdPicWithFace' navigation={props.navigation}/>
        </View>  // Container End
    ) : (<></>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9D71C'
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',        
        paddingHorizontal: 20,
        paddingBottom: 30,
        marginTop: 50,
        marginBottom: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    subText_header: {
        color: '#fff',
        fontSize: 17,
        marginTop: 20,
        fontWeight: 'bold'
    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    uploadBtn: {
        fontSize: 15,
        backgroundColor: '#F9D71C',
        alignSelf: 'center',
        color: '#000',
        borderRadius: 5,
        marginTop: 20,
        padding: 3,
        width: '65%',
        textAlign: 'center',
    },
})
