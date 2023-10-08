import { Camera, CameraType } from 'expo-camera';
import { useContext,useRef, useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import {ButtonLarge} from '@components/ButtonLarge'
import * as ImagePicker from 'expo-image-picker';
import { DBContext } from '@providers/FirestoreProvider';
import { deleteAsync } from 'expo-file-system';
import { LoadingScreen } from '@components/Loading';





export const CameraScreen = ({navigation}) => {
  const ref = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [chosenImage, setChosenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    uploadImage,
    setProperty,
    property
  } = useContext(DBContext)

  
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button onPress={requestPermission} title="Grant Camera Permissions" />
      </View>
    );
  }

const captureImage = async () => {
      setLoading(true);
  try {
    if (cameraReady) {
      let photo = await ref.current.takePictureAsync();

      let response = await fetch(photo.uri);
      // console.log("response: ", response);
      let blob = await response.blob();
      // console.log("blob: ", blob);

      // Call the uploadImage function and pass the captured image blob
      let uploadedImage = await uploadImage(blob);
      // always reset to get rid of any unfinished uploads
      setProperty({frontImage: uploadedImage.downloadURL});
      // console.log('Uploaded image details:', uploadedImage);

      await deleteAsync(photo.uri, { idempotent: true });
      // console.log("deleted photo");
      // You can add navigation or other logic here
      photo = null;
      response = null;
      blob = null;
      uploadedImage = null;
      setLoading(false);
      navigation.navigate("BackCamera");
    } else {
      console.log("Camera not ready");
    }
  } catch (error) {
    console.log("Error with camera: ", error);
  }
  setLoading(false);
}

  const back = () => {
    navigation.navigate('Home');
  }

  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
      ? Camera.Constants.FlashMode.torch
      : Camera.Constants.FlashMode.off);
    }
    
  const pickImage = async () => {
    try {
      setLoading(true);

      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        let response = await fetch(selectedAsset.uri);
        let blob = await response.blob();

        // Call the uploadImage function and pass the picked image blob
        let uploadedImage = await uploadImage(blob);

        setProperty({ frontImage: uploadedImage.downloadURL });

        // Delay for 2 seconds if needed
        // await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false); // Move this line here

        navigation.navigate("BackCamera");
      }
    } catch (error) {
      console.log("Error picking image: ", error);
      setLoading(false); // Set loading to false in case of error
    }
  };




  return (
        <SafeAreaView style={styles.safeView}>
          {
            loading &&
            <LoadingScreen label="Analyzing Electric Bill ...."></LoadingScreen>
          }
          {chosenImage ? <Image source={chosenImage}></Image> : null}
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={back}
              >
                <Image
                  source={require('@assets/back1x.png')}
                />
              </TouchableOpacity>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Scan Front of Bill</Text>
                <Text style={styles.headerSubheading}>Hold your phone still near front part of your electricity bill.</Text>
              </View>
            </View>
              <Camera ref={ref} style={styles.camera} type={type} flashMode={flash} onCameraReady={() => setCameraReady(true)} >
              <View style={styles.cameraBtns}>
                  <View style={styles.cameraOptions}>
                    <TouchableOpacity style={styles.cameraBtn} onPress={async () => pickImage()} >
                      <Image
                      source={require('@assets/CameraRoll.png')}
                      />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.cameraBtn} onPress={toggleFlash}>
                      <Image
                    source={flash !== Camera.Constants.FlashMode.off ? require('@assets/FlashIcon.png') : require('@assets/FlashIconOn.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <ButtonLarge style={styles.btn}text={'Next'} run={captureImage}></ButtonLarge>
              </View>
              </Camera>
              
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems:'center',
    flex: 1
  },
  cameraBtn: {
    marginRight: 60,
    marginLeft: 60,
    // bottom: 0,
  },
  cameraBtns: {
    position: 'absolute',
    bottom: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraOptions: {
    position: 'absolute',
    bottom: 90,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    // justifyContent: 'center',
    // alignContent: 'center',
    height: '85%'
  },

  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 30,
    marginTop: 20
  },
  headerSubheading: {
    fontWeight: 400,
    marginTop: 10
  },
  headerContainer: {
    backgroundColor: '#EEF7FE',
    marginBottom: 20,
    marginTop: 18,
    marginLeft: 30
  },
  safeView: {
    // position: 'absolute',
    // top: 0,
    // width: '100%',
    // height: '100%'
    backgroundColor: '#EEF7FE',
  },
  background: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: '#EEF7FE',
  },
});
