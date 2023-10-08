import React, { useState , useContext} from 'react';
import {Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, ScrollView} from 'react-native';
import { AuthStateContext } from '@providers/AuthProvider';
import {InputButtonSmall} from '@components/InputButtonSmall';
import { ButtonLarge } from '@components/ButtonLarge';
import { DBContext } from '@providers/FirestoreProvider';
import { LoadingScreen } from '@components/Loading';


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
            placeholder:'Name',
            label:'Name',
            keyboardType:'default',
            hidden:false,
            id: 1,
            break: false
        },
        {
            placeholder:'Address',
            label:'Address',
            keyboardType:'default',
            hidden:false,
            id: 2,
            break: true
        },
        {
            break: false ,
            id: 3,
            label:'Total Amount Due',
            placeholder:'$0.00',
            keyboardType:"number-pad",
            hidden:false
        },
        {
          id: 4,
          label: 'Months Usage',
          placeholder: '380 KWh',
          keyboardType: "number-pad",
            break: true,
          hidden: false
        },
        {
          id: 5,
          label: 'Provider',
          placeholder: 'Circa',
          keyboardType: 'default',
            break: false ,
          hidden: true
        },
        {
          id: 6,
          label: 'Plan',
          placeholder: '12 month',
          keyboardType: 'default',
            break: false ,
          hidden: true
        },
        {
          id: 7,
          label: 'Utility Number',
          placeholder: '0000000000',
          keyboardType: 'default',
            break: false ,
          hidden: true
        },
        {
            id: 8,
            label:'Service Period',
          placeholder:'01/01/2023 to 31/12/2023',
            keyboardType:'default',
            break: false ,
            hidden: true
        },
        {
          id: 9,
          label: 'Statement Number',
          placeholder: '01/01/2023 to 31/12/2023',
            break: true,
          keyboardType: 'default',
          hidden: true
        },
      {
        break: false,
        id: 10,
        label: 'Taxes',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 11,
        label: 'Adjustment',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 12,
        label: 'Trijunction line losses',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 13,
        label: 'Electric Supply Charges',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: false,
        id: 14,
        label: 'Market Charges',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
      {
        break: true,
        id: 15,
        label: 'UDC Charges',
        placeholder: '$0.00',
        keyboardType: "number-pad",
        hidden: true
      },
    ] 

    const finalize = async () => {
        setLoading(true);
        setTimeout(() => {
          
        }, 1000);
        setProperty({...property, ...formFields});
        console.log("Property: ",property);
        await uploadImagesToFirestore();
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
                    <TouchableOpacity
                    onPress={back}
                    >
                        <Image
                        source={require('@assets/back1x.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerText}> 
                        <Text style={styles.headerTitle}>Verify Bill</Text>
                        <Text style={styles.headerSubheading}>Please Enter missing data before continuing</Text>
                    </View> 
                </View>
            </View>
            <ScrollView style={styles.form}>
                <View style={styles.inputGroup}>
                  {
                    fields.map((field) => {
                      return(
                        <InputButtonSmall
                        placeholder={field.placeholder}
                        run={onFieldChange}
                        label={field.label}
                        break={field.break}
                        />
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
