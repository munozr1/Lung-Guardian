import { Camera, CameraType } from 'expo-camera';
import { useRef, useState, useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { ButtonLarge } from '@components/ButtonLarge'
import * as ImagePicker from 'expo-image-picker';
import { DBContext } from '@providers/FirestoreProvider';
import { LoadingScreen } from '@components/Loading';



export const BackCameraScreen = ({ navigation }) => {
  const ref = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [chosenImage, setChosenImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    uploadImage,
    setProperty,
    property
  } = useContext(DBContext)

  const captureImage = async () => {
    try {
        const photo = await ref.current.takePictureAsync();
        console.log("tooke photo");

        setLoading(true);
        const response = await fetch(photo.uri);
        console.log("got response response");
        const blob = await response.blob();
        console.log("got blob");

        // Call the uploadImage function and pass the captured image blob
        const uploadedImage = await uploadImage(blob, false);
        console.log("uploaded image");

        // Do not reset front image
        setProperty({ ...property, backImage: uploadedImage.downloadURL});
        console.log('Uploaded image details:', uploadedImage);

        // You can add navigation or other logic here
        setLoading(false);
        navigation.navigate("VerifyBill");
    } catch (error) {
      console.log("Error with camera: ", error);
    }
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

        navigation.navigate("VerifyBill");
      }
    } catch (error) {
      console.log("Error picking image: ", error);
      setLoading(false); // Set loading to false in case of error
    }
  };


  const back = () => {
    navigation.navigate('Home');
  }
  const toggleFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off);
  }

  return (
    <SafeAreaView style={styles.safeView}>
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
          <Text style={styles.headerTitle}>Scan Back of Bill</Text>
          <Text style={styles.headerSubheading}>Hold your phone still near front part of your electricity bill.</Text>
        </View>
      </View>
      <Camera ref={ref} style={styles.camera} type={type} flashMode={flash} >
        <View style={styles.cameraBtns}>
          <View style={styles.cameraOptions}>
            <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
              <Image
                source={require('@assets/CameraRoll.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraBtn} onPress={toggleFlash}>
              <Image
                source={require('@assets/FlashIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <ButtonLarge style={styles.btn} text={'Send To Analyze'} run={captureImage}></ButtonLarge>
        </View>
      </Camera>
      {
        loading &&
        <LoadingScreen label="Analyzing Electric Bill ...."></LoadingScreen>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
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
