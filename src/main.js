import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen } from '@screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStateContext} from '@providers/AuthProvider';
import { AuthScreen} from '@screens/auth';
import { RegisterScreen } from '@screens/register';
import { CameraScreen} from '@screens/camera';
import { BackCameraScreen } from '@screens/camera/back';
import { VerifyInfoScreen } from '@screens/verifyInfo';
import { SMSScreen } from '@screens/SMS';
import { SMSLogInScreen } from '@screens/login';

const Stack = createNativeStackNavigator();
const Authenticated = createNativeStackNavigator();

export default function Main() {
  const {
    $authState,
    $setAuthState,
  } = React.useContext(AuthStateContext);

  return (
    <>
      <NavigationContainer>
        { $authState.Authenticated ? 
          (<Authenticated.Navigator style={styles.container} screenOptions={{
            headerShown: false
          }}>
            <Authenticated.Screen name="Home" component={HomeScreen} key={'3'}/>
            <Authenticated.Screen name="Camera" component={CameraScreen} key={'4'}/>
            <Authenticated.Screen name="BackCamera" component={BackCameraScreen} key={'5'}/>
            <Authenticated.Screen name="VerifyBill" component={VerifyInfoScreen} key={'6'}/>
          </Authenticated.Navigator>) :
          (<Stack.Navigator style={styles.container} screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="SignIn"  key={'1'} component={AuthScreen}/>
            <Stack.Screen name="RegisterEmail"  key={'2'}>
              {(props) => <RegisterScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="SMSVerification"  key={'7'}>
              {(props) => <SMSScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="SMSLogIn"  key={'8'}>
              {(props) => <SMSLogInScreen {...props}/>}
            </Stack.Screen>
          </Stack.Navigator>)
        }
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
