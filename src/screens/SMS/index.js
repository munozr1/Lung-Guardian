import { Image ,SafeAreaView,View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import * as React from 'react';
import {AuthStateContext} from '@providers/AuthProvider';

export const SMSScreen = ({navigation, route}) => {
  const CODE_LENGTH =  6;
  const [code, setCode] = React.useState('');
  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);
  const ref = React.useRef();
  const [phone, setPhone] = React.useState(route.params.phone);
  const { sendVerificationCode, confirmVerificationCode, $authState, $setAuthState } = React.useContext(AuthStateContext);

  React.useEffect(() => {
    console.log("SMS Phone (effect on load): ", phone);
    sendVerificationCode(phone, route.params.ref);
    return () => {
      console.log("SMS Phone (effect on unmount): ", phone);
    }
  }, []);
  const back = () => {
    navigation.navigate('SignIn');
  }

  const focusHiddenInput = () => {
    // console.log('focusing hidden input...');
    ref?.current?.focus();
  };

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;
    return (
      <View key={idx} style={{ marginTop: 0 }}>
        <Text style={[styles.input, { borderWidth: 1, borderColor: '#9ea9ba' }, styles.shadow]} >{digit}</Text>
      </View>
    );
  };

  const confirmCode = async () => {
    //loading
    await confirmVerificationCode(code);
  }

  const resendCode = async () => {
    //loading
    await sendVerificationCode(phone, route.params.ref);
  }

  return (
    <>
    <SafeAreaView style={[styles.container]}>
      <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={back}>
          <Image
            source={require('@assets/back1x.png')}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>SMS Verification Code</Text>
          <Text style={styles.headerSubheading}>Enter the code sent to the phone number provided</Text>
        </View>
      </View>
      
      <View>
        <Pressable style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          maxHeight: 100,
          marginTop: 0,
        }} onPress={focusHiddenInput}>
          {codeDigitsArray.map(toDigitInput)}
        </Pressable>
        
        <TextInput
          ref={ref}
          value={code}
          onChangeText={code => {setCode(code)}}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={6}
          style={styles.hiddenCodeInput}
        />
      </View>
      </View>
      
      <View style={styles.rowContainer}>
        <Text style={styles.botLabel}>Didn't receive a code? </Text>
        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.botLabel}>Send it again</Text>
        </TouchableOpacity>
      </View> 
        <View style={styles.verify}>
          <TouchableOpacity onPress={confirmCode}>
            <Text style={styles.botLabel}>Verify</Text>
          </TouchableOpacity>
        </View> 
        
      
    </SafeAreaView>
    
    </>
  )
}


let styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    top: 120
  }, 
  verify: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    top: 50
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
    backgroundColor: '#EEF7FE',
    borderRadius: 37,
    height: '100%', 
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
    marginBottom: 20,
    marginTop: 18,
    marginLeft: 30,
    top: 0,
    // height: '100%'
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 30,
    marginTop: 20
  },
  botLabel: {
    fontWeight: 600,
  }
})
