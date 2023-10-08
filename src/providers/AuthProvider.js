import * as React from "react";
import { PhoneAuthProvider, signInWithCredential, createUserWithEmailAndPassword ,getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut} from 'firebase/auth';
import { initializeApp} from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAGb__04cBQV_GB6C1h9C8sVUrvrjNySR8",
  authDomain: "sparksync-e6733.firebaseapp.com",
  projectId: "sparksync-e6733",
  storageBucket: "sparksync-e6733.appspot.com",
  messagingSenderId: "919377834272",
  appId: "1:919377834272:web:d0232a9d293f0e6d0b2745"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
// create context
const AuthStateContext= React.createContext()

const AuthStateProvider = ({ children }) => {
    // the value that will be given to the context
    const [$authState, $setAuthState] = React.useState({Authenticated: false});
  const [verificationId, setVerificationId] = React.useState();

    const googleProvider = new GoogleAuthProvider(auth);
    const signInWithGoogle= async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
            
        } catch (err) {
            console.log(`AuthStateProvider => GoogleAuth() err:`,err);
        }
    }

    const registerEmailAndPassword = (user) => {
        createUserWithEmailAndPassword(auth, user.Email, user.Password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            $setAuthState({...user, Authenticated: true});
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("registerEmailAndPassword() => Code: ", errorCode, " Message: ", errorMessage);
          });
    }

    const signInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            $setAuthState({...user, Authenticated: true});
        })
        .catch((err)=>{
            const code = err.code;
            const message = err.message;
            console.log("signInWithEmail() => Code ", code, "Message ", message);
        })
    }
    
    const logOut = () => {
        signOut(auth).then(()=>{
            $setAuthState({});
        })
        .catch((err)=>{
            const code = err.code;
            const message = err.message;
            console.log("signInWithEmail() => Code ", code, "Message ", message);
        })
    }


  const sendVerificationCode = async (phoneNumber, ref) => {
    //add phone number extenstion -> only in the us for now
    phoneNumber = '+1' + phoneNumber;
    // console.log(phoneNumber);

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        ref.current
      );
      setVerificationId(verificationId);
      $setAuthState({ ...$authState, ...{ phoneNumber, codeSent: true } });
      // console.log('Successfully sent code to user: ', phoneNumber);
    } catch (err) {
      console.log(`err with ${phoneNumber} :`, err);
    }
  }

  const confirmVerificationCode = async (verificationCode) => {
    console.log("......Confirming Verification Code", verificationCode)
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const user = await signInWithCredential(auth, credential);
      $setAuthState({ ...$authState, ...{ Authenticated: true }, user });
      console.log({ text: 'Phone authentication successful 👍', user });
    } catch (err) {
      console.log({ text: `Error: ${err.message}`, color: 'red' });
    }
  }

  
  return (
    // the Provider gives access to the context to its children
    <AuthStateContext.Provider
      value={{$authState,
          $setAuthState,
          signInWithGoogle,
          signInWithEmail,
          registerEmailAndPassword,
          sendVerificationCode,
          logOut,
          confirmVerificationCode
      }}>
      
      {children}
    </AuthStateContext.Provider>
  );
};

export { AuthStateContext, AuthStateProvider, app, firebaseConfig};
