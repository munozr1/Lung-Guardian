import { Image ,SafeAreaView,View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import * as React from 'react';
import { firebaseConfig } from '@providers/AuthProvider';
import {InputButton} from '@components/InputButton';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';



export const SMSLogInScreen = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const recaptchaRef = React.useRef(null);

  React.useEffect(() => {
    console.log("Phone (effect): ", phone);
  }, [phone]);


  const back = () => {
    navigation.navigate('SignIn');
  }

  const updatePhone = (val) => {
    setPhone(val);
  }
  const sendCode = () => { 
    navigation.navigate('SMSVerification', { phone: phone, ref: recaptchaRef });
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaRef}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      ></FirebaseRecaptchaVerifierModal>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={back}>
          <Image
            source={require('@assets/back1x.png')}
          />
        </TouchableOpacity>
        <View >
          <Text style={styles.headerTitle}>Enter Phone Number</Text>
        </View>
      </View>

      <InputButton
        label=""
        placeholder="123-456-7890"
        keyboardType="number-pad"
        run={updatePhone}
      ></InputButton>
      <TouchableOpacity style={[styles.btn, {opacity: phone && phone.length === 10 ? 1 : .1}]} onPress={sendCode} disabled={!phone || phone.length < 10}>
        <Text style={styles.secondLabel}>Send Code</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}


let styles = StyleSheet.create({
  login: {
    color: 'blue',
    marginLeft: 4,
    fontWeight: 600
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 15,
    height: 80,
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 5,
    marginRight: 5,
    width: 55,
    textAlign: 'center',
    fontSize: 35,
    borderRadius: 15,
  },
  shadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 1 / 3,
    elevation: 1,
  }
  ,
  container: {
    borderRadius: 37,
    height: '100%', 
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EEF7FE',
  },
  label: {
    textAlign: "center",
    padding: "3%",
    fontWeight: 800,
  },
  secondLabel: {
    textAlign: "center",
    padding: "3%",
    fontWeight: 500,
    // opacity: 0.5,
  },
  optionalLable: {
    borderWidth: 1
  },
  botLabel: {
    width: '100%',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  headerSubheading: {
    fontWeight: 400,
    marginTop: 10
  },
  headerContainer: {
    backgroundColor: '#EEF7FE',
    marginTop: 10,
    marginLeft: 30,
    top: 0,
    width: '100%',
    height: 150
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 30,
    marginTop: 20
  },
})
