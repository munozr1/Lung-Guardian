import React, { useState } from 'react';
import {Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import { AuthStateContext } from '@providers/AuthProvider';
import {InputButton} from '@components/InputButton';
import { ButtonLarge } from '@components/ButtonLarge';
import { firebaseConfig } from '@providers/AuthProvider';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export const RegisterScreen= ({navigation}) => {

    const [formFields, setFormFields] = useState({});
    const recaptchaRef = React.useRef(null);
    const {
      sendVerificationCode  ,
      confirmVerificationCode,
      $authState,
      $setAuthState,
    } = React.useContext(AuthStateContext);

    const back = () => navigation.navigate('SignIn');

    const fields = [
        {
            placeholder:'First Name',
            label:'Name',
            keyboardType:'default',
            hidden:false,
            key: 1
        },
        {
            placeholder:'Email',
            label:'Email',
            keyboardType:'default',
            hidden:false,
            key: 2
        },
        {
            key: 3,
            placeholder:'Phone',
            label:'Phone',
            keyboardType:'number-pad',
            hidden:false
        },
        {
            key: 4,
            placeholder:'Password',
            label:'Password',
            keyboardType:'default',
            hidden: true
        },
    ]

    const registerUser = async () => {
        console.log("Form Fields: ",formFields);
        // registerEmailAndPassword(formFields);
        await sendVerificationCode(fields['phone'], recaptchaRef)
        if($authState.codeSent) navigation.navigate('SMSVerification');
    }
    const onFieldChange = (label, val) => {
        setFormFields({...formFields, label: val})
        console.log(formFields[label]);
    }

    return (
        <>
        <View style={styles.background}>
            <SafeAreaView style={styles.safeView}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaRef}
              firebaseConfig={firebaseConfig}
              attemptInvisibleVerification={true}
            ></FirebaseRecaptchaVerifierModal>
            <View>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                    onPress={back}
                    >
                        <Image
                        source={require('@assets/back1x.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerText}> 
                        <Text style={styles.headerTitle}>Sign Up</Text>
                        <Text style={styles.headerSubheading}>It only takes a minute to create your account</Text>
                    </View> 
                </View>
            </View>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {
                        fields.map(field =>(
                            <InputButton 
                            placeholder={field.placeholder}
                            label={field.label}
                            keyboardType={field.keyboardType}
                            hidden={field.hidden}
                            run={onFieldChange}
                            />
                        ))
                    }
                    <ButtonLarge
                    text='Create Account'
                    style={styles.createAccount}
                    run={registerUser}
                    />    
                </View>
                
            </View>
        </SafeAreaView>
        </View>
        </>
    )
}

const styles = new StyleSheet.create({
    headerTitle : {
        fontWeight : '600',
        fontSize : 30,
        marginTop: 20
    },
    headerSubheading: {
        fontWeight : '400',
        marginTop: 10
    },
    headerContainer  : {
        backgroundColor: '#EEF7FE',
        marginBottom : 90,
        marginTop : 18,
        marginLeft : 30
    },
    safeView : {
        position : 'absolute',
        top: 0,
        width: '100%'
    },
    background : {
        width :'100%',
        height : '100%',
        backgroundColor: '#EEF7FE',
    },
    form : {
        backgroundColor : 'white',
        width : '100%',
        position : 'relative',
        top : 0,
        marginTop : 0,
        height : '100%',
    },
    inputGroup : {
        marginLeft : '8%',
        backgroundColor : 'transparent'
    },
    createAccount : {
        marginTop : 50
    }

})
