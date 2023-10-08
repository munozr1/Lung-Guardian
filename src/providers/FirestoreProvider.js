import * as React from "react";
import { app } from './AuthProvider';
import {where,getDocs, query,getFirestore, collection,  addDoc, } from "firebase/firestore";


import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { emailTemplate } from "./emailtemplate";


const db = getFirestore(app);
const DBContext = React.createContext();
const delay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const FirestoreProvider = ({ children }) => {
  const [docId, setDocId] = React.useState(null);
  const [property, setProperty] = React.useState({});

  /*


      DB FUNCTIONS FOR EVENTS

  */

  const fetchUser = async (phone) => {
    try {
      //query for event with host number
      let docSnap;
      const q = query(collection(db, 'users'), where('phoneNumber', '==', phone));
      // const querySnapshot = 
      await getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          console.log('fetchUser() => getDocs() => docId: ', querySnapshot.docs[0].id);
          docSnap = querySnapshot.docs[0].data();
        }
      });

      if (!docSnap)
        return null;
      return docSnap;
    } catch (err) {
      console.log('Firestore Provider => fetchUser() => Error: ', err);
      throw err;
    }
  }


  const uploadImagesToFirestore = async () => {
    try {
      const mail = {
        message: { 
          html: emailTemplate(property), 
          text: 'text', 
          subject: `New Customer Spark Sync ${property.Address} `
        },
        to: ['admin@sparksync.pro', 'rm117579@gmail.com'],
        ...property
      }
      // main = { ...property, ...mail };
      // Create a document in the 'images' collection with the given data
      console.log('Uploading images to Firestore:', property);
      const docRef = await addDoc(collection(db, 'mail'), mail);
      console.log('Images uploaded to Firestore:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.log('Error uploading images to Firestore:', error);
      return null;
    }
  };

  /*
   *  Updated to Web version 9
   */
  // Creates event in database
  const uploadImage = async (blob, skip = false) => {
    try {
      // Upload the image blob to Firebase Storage
      let  storage = getStorage(app);
      let  storageRef = ref(storage, `images/${Date.now()}.jpg`);
      console.log("created storage ref", storageRef);
      try{
        if(!skip)
          await uploadBytesResumable(storageRef, blob);
        console.log("uploaded bytes");
      }
      catch(e){
        console.log("error uploading image: ", e);
        console.log('Error payload:', e.serverResponse);
      }

      if(skip){
        return { id: null,  downloadURL: null };
      }
      // Get the download URL of the uploaded image
      let  downloadURL = await getDownloadURL(storageRef);
      console.log('Image available at:', downloadURL);

      // Create a document in the 'locations' collection with the download URL
      let  docRef = await addDoc(collection(db, 'locations'), {
        imageUrl: downloadURL,
      });

      console.log('Image uploaded and document created:', docRef.id);

      storage = null;
      storageRef = null;
      return { id: docRef.id,  downloadURL };

    } catch (error) {
      console.log('Error uploading image and creating document:', error);
    }
  }


  return (
    // the Provider gives access to the context to its children
    <DBContext.Provider
      value={{
        uploadImage,
        setProperty,
        property,
        uploadImagesToFirestore,
        fetchUser,
      }}>
      {children}
    </DBContext.Provider>
  );
};

export { DBContext, FirestoreProvider };
