import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UploadPicture from '../../CommonComponents/UploadPicture';

export default function SignUpProfilePic(props) {
    const [userData, setUserData] = useState(null);
   
      useEffect(() => {
        if (userData === null)
          setUserData(props.route.params);
        
      }, []);
    
    return userData ? (
        <View style={styles.container}>
            <View style={styles.header}>
                    <Text style={styles.text_header}>Profile Picture</Text>
                    <Text style={styles.subText_header}>Please upload your picture that your face is showing clearly.</Text>
            </View>
            
        <UploadPicture userObj={userData} uploadPictureType='Profile' nextNavigateScreen='SignUpIdPic' navigation={props.navigation}/>
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
})