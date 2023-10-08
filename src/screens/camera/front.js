import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { ButtonLarge } from '@components/ButtonLarge'
import * as ImagePicker from 'expo-image-picker';
// import { DBContext } from '@providers/FirestoreProvider';



export const FrontCameraScreen = ({ navigation, toggleFlash, captureImage, pickImage }) => {
  const ref = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [chosenImage, setChosenImage] = useState(null);

  const back = () => {
    navigation.navigate('Home');
  }

  const next = () => {
    captureImage();
    navigation.navigate('BackCameraScreen');
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
          <Text style={styles.headerTitle}>Scan Front of Bill</Text>
          <Text style={styles.headerSubheading}>Hold your phone still near front part of your electricity bill.</Text>
        </View>
      </View>
      <Camera ref={ref} style={styles.camera} type={type} flashMode={flash} onCameraReady={() => setCameraReady(true)} >
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
          <ButtonLarge style={styles.btn} text={'Next'} run={next}></ButtonLarge>
        </View>
      </Camera>
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
  },
  background: {
    // width: '100%',
    // height: '100%',
    // backgroundColor: '#EEF7FE',
  },
});
