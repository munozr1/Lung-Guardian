import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CircleButton} from '@components/CircleButton';
import { DBContext } from '@providers/FirestoreProvider';
import { AuthStateContext } from '@providers/AuthProvider';
import { VerifyInfoScreen } from '@screens/verifyInfo';



export const HomeScreen= ({navigation}) => {
  const {fetchUser} = React.useContext(DBContext);
  const {$authState, $setAuthState} = React.useContext(AuthStateContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    //fetch user data using phone number from firestore user collection
    setLoading(true);
    // console.log("Home Screen Mounted");
    // console.log("Auth State: ", $authState);
    async function fetchdata(){
      const user = await fetchUser($authState.phoneNumber);
      $setAuthState({...$authState, firestoreUser: {...user}})
      await setTimeout(() => {
        
      }, 2000);
    }
    fetchdata();
    setLoading(false);

    return () => {
      console.log("Home Screen Unmounted");
    }
  }, []);

    return (
      <View style={styles.container}>
          <VerifyInfoScreen></VerifyInfoScreen>
        </View>
      );
    
}

const styles = new StyleSheet.create({
    plus: {
        borderRadius: '100%',
        borderWidth : 1,
        borderColor : '#346AFE',
        position: 'absolute',
        padding: 15,
        top: -20,
        backgroundColor: 'white',
        borderTopWidth: 0,
        zIndex: 99
    },
    navbar: {
      flex: 1,
      flexDirection: 'row',
      borderTopLeftRadius: 40,
      borderTopRightRadius:40,
      borderColor : '#346AFE',
      borderWidth : 1,
      height: 120,
      bottom: 0,
      position: 'absolute',
      width: '100%',
      justifyContent: 'center',
      borderBottomWidth: 0,
      backgroundColor: '#EEF7FE',
      shadowColor: '#EEF7FE',
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
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
        fontWeight : 900,
        fontSize : 40
    },
    headerContainer : {
        marginBottom : 170,
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
  },
});

