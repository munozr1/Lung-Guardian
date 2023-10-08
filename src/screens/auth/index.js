import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {ProviderLoginButton} from '@components/ProviderLoginButton';
import { AuthStateContext } from '@providers/AuthProvider';


export const AuthScreen= ({navigation}) => {
    const { 
      signInWithGoogle
    } = React.useContext(AuthStateContext);
    
    const googleSvg = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    const emailSvg = 'https://www.svgrepo.com/show/511917/email-1572.svg'
    const phoneSvg = 'https://www.svgrepo.com/show/526086/phone.svg'


      const gotoLogin= () => navigation.navigate("SMSLogIn");
      const gotoRegister= () => navigation.navigate("RegisterEmail");
    
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.safeView}>
            <View>
                <View style={styles.headerContainer}>
                    {/* <Image
                    source={require('@assets/favicon.png')}
                    /> */}
                    <Text style={styles.header}>Welcome To</Text>
                    <Text style={styles.header}>Lungardian</Text>
                </View>
                <ProviderLoginButton provider="Phone" url={phoneSvg} navigate={gotoRegister}/>
                {/* <ProviderLoginButton provider="Google" url={googleSvg} navigate={signInWithGoogle}/> */}
                <View style={styles.rowContainer}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={gotoLogin}>
                        <Text style={styles.login}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
            </View>
        )
    }

const styles = new StyleSheet.create({
    login: {
        color: 'blue',
        marginLeft: 4,
        fontWeight: 600
    },
    rowContainer : {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    footer : {
        marginTop: 'auto'
    },
    header : {
        fontWeight : 600,
        fontSize : 40
    },
    headerContainer : {
        marginBottom : 130,
        marginTop : 0
    },
    safeView : {
        position : 'absolute',
        top: 150
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }

})
