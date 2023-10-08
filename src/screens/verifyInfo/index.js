import React, { useState , useContext} from 'react';
import {Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import { AuthStateContext } from '@providers/AuthProvider';
import {InputButtonSmall} from '@components/InputButtonSmall';
import { ButtonLarge } from '@components/ButtonLarge';
import { DBContext } from '@providers/FirestoreProvider';
import { LoadingScreen } from '@components/Loading';
import { CheckBoxC } from '@components/CheckBoxC';

export const VerifyInfoScreen= ({navigation}) => {

    const [formFields, setFormFields] = useState({});
    const [loading, setLoading] = useState(false);
    const {
      setProperty,
      property,
      uploadImagesToFirestore
    } = useContext(DBContext)


    const back = () => navigation.navigate('Home');

    const fields = [
        {
            placeholder:'Gender',
            label:'Gender',
            keyboardType:'default',
            hidden:false,
            id: 1,
            break: false,
            bool: false
        },
        {
            placeholder:'Age',
            label:'Age',
            keyboardType:'default',
            hidden:false,
            id: 2,
            break: true,
            bool: false
        },
        {
            break: false ,
            id: 3,
            label:'Smoking',
            bool: true,
            checked: false,
            placeholder:'Yes/No',
            keyboardType:"number-pad",
            hidden:false
        },
        {
          id: 4,
          label: 'Yellow Finger',
          bool: true,
          checked: false,
          placeholder: 'Yes/No',
          keyboardType: "number-pad",
          break: true,
          hidden: false
        },
        {
          id: 5,
          label: 'Anxiety',
          bool: true,
          checked: false,
          placeholder: 'Yes/No',
          keyboardType: 'default',
          break: false ,
          hidden: true
        },
        {
          id: 6,
          label: 'Chronic Diseases',
          bool: true,
          checked: false,
          placeholder: 'Yes/No',
          keyboardType: 'default',
            break: false ,
          hidden: true
        },
        {
          id: 7,
          label: 'Fatigue',
          bool: true,
          checked: false,
          placeholder: 'Yes/No',
          keyboardType: 'default',
            break: false ,
          hidden: true
        },
        {
            id: 8,
            label:'Allergy',
            bool: true,
            checked: false,
            placeholder:'Yes/No',
            keyboardType:'default',
            break: false ,
            hidden: true
        },
        {
          id: 9,
          label: 'Wheezing',
          bool: true,
          checked: false,
          placeholder: 'Yes/No',
          break: true,
          keyboardType: 'default',
          hidden: true
        },
      {
        break: false,
        id: 10,
        label: 'Alcohol Consumption',
        bool: true,
        checked: false,
        placeholder: 'Yes/No',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 11,
        label: 'Shortness of Breath',
        bool: true,
        checked: false,
        placeholder: 'Yes/No',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 12,
        label: 'Swallowing Difficulty',
        bool: true,
        checked: false,
        placeholder: 'Yes/No',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 13,
        label: 'Chest pain',
        bool: true,
        checked: false,
        placeholder: 'Yes/No',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 14,
        label: 'Market Charges',
        bool: true,
        checked: false,
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: true,
        id: 15,
        label: 'UDC Charges',
        bool: true,
        checked: false,
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
    ] 

    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (id) => {
      console.log("Checkbox Pressed: ", id);
      fields[id-1].checked = !fields[id-1].checked;
    };    

    const fieldType = (field) => {
      if(!field.bool){
        return(
          <InputButtonSmall
            placeholder={field.placeholder}
            run={onFieldChange}
            label={field.label}
            break={field.break}
            bool={field.bool}
          />
        )
      }else{
        return(
          <CheckBoxC
          label={field.label}
          checked={field.checked}
          onpress={() => handleCheckboxChange(field.id -1)}
          key={field.id}
          ></CheckBoxC>
        )
      }
    }

    const finalize = async () => {
        setLoading(true);
        setProperty({...property, ...formFields});
        console.log("Property: ",property);
        // await uploadImagesToFirestore();
        setLoading(false);
        navigation.navigate('Home');
    }
    const onFieldChange = (label, val) => {
        setFormFields({...formFields, [label]: val})
        console.log(formFields[label]);
    }




    return (
        <>
        <View style={styles.background}>
            {/* <SafeAreaView style={styles.safeView}> */}
            <SafeAreaView >
            <View>
                <View style={styles.headerContainer}>
                    {/* <TouchableOpacity
                    onPress={back}
                    >
                        <Image
                        source={require('@assets/back1x.png')}
                        />
                    </TouchableOpacity> */}
                    <View style={styles.headerText}> 
                        <Text style={styles.headerTitle}>New Patient Form</Text>
                        <Text style={styles.headerSubheading}>Please answer honestly and to the best of your ability</Text>
                    </View> 
                </View>
            </View>
            <ScrollView style={styles.form}>
                <View style={styles.inputGroup}>
                  {
                    fields.map((field) => {
                      return(
                        fieldType(field)
                      )
                    })
                  }

                    <ButtonLarge
                    text='Finish'
                  style={[styles.lrgbtn, { marginTop: 50, }]}
                    run={finalize}
                    />    
                  <ButtonLarge
                    text='Cancel'
                  style={[styles.lrgbtn, { marginTop: 10 ,marginBottom: 200}]}
                    run={() => navigation.navigate('Home')}
                    pcolor='#FF0000'
                  />
                </View>
            </ScrollView>
        </SafeAreaView>
        {
          loading && <LoadingScreen label='Finalizing Property Details...'></LoadingScreen>
        }
        </View>
        </>
    )
}

const styles = new StyleSheet.create({
    headerTitle : {
        fontWeight : '600',
        fontSize : 30,
        marginTop: 20,
        backgroundColor: '#EEF7FE',
    },
    headerSubheading: {
        fontWeight : '400',
        marginTop:5 
    },
    headerContainer  : {
        backgroundColor: '#EEF7FE',
        marginBottom : 40,
        marginTop : 18,
        marginLeft : 30
    },
    safeView : {
        position : 'absolute',
        top: 0,
        width: '100%',
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
        width : '100%',
        padding: 15
    },
    lrgbtn : {
        alignItems : 'center',

    }

})
