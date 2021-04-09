import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {  Button } from 'react-native-paper';

export default function UploadPicture(props) {

    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [uploadPicType, setUploadPicType] = useState(null);

      const onClickUploadBtn = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        switch (uploadPicType) {
            case 'Profile':
                userData.profilePic = result.uri;
                break;
            case 'IdPicture':
                userData.idPic = result.uri;
                break;
            case 'IdPicWithFace':
                userData.idPicWithFace = result.uri;
                break;
        }
       
        if (!result.cancelled) {
          setImage(result.uri);
        } 
        
      };
    const onClickNextBtn = () => {
        setUploadPicType(null);
      props.navigation.navigate(props.nextNavigateScreen,userData);
      }
  
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        
        if (userData === null)
            setUserData(props.userObj);
        if (uploadPicType === null)
            setUploadPicType(props.uploadPictureType);
      }, []);
    
    return (
        <View style={styles.footer}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 20 }} />}
            </View>
            
            <Button onPress={onClickUploadBtn}  mode="contained" style={[styles.uploadBtn]}>Upload</Button>
            <View style={{  alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', marginBottom: 20}}>
                <Button onPress={() => {props.navigation.goBack()}} mode="contained" style={[styles.uploadBtn, {width: '40%', backgroundColor: '#ECECEC'}]}>Go Back</Button>
                <Button onPress={onClickNextBtn} disabled={!image}  mode="contained" style={[styles.uploadBtn, image === null ?  {width: '40%', backgroundColor: '#ECECEC'} : {width: '40%', backgroundColor: '#F9D71C'}]}>Next</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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