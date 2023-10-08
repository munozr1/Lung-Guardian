import React from 'react';
import {View,TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import { SvgUri } from 'react-native-svg';



export const InputButton= (props) => {

    
    return (
        <>
        <Text style={styles.label}>
        {props.label}
        </Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            secureTextEntry={props.hidden}
            onChangeText={text => props.run(text)}
            />
        </View>
        </>
    )
}

const styles = new StyleSheet.create({
    inputContainer : {
        borderWidth: 1,
        borderColor: 'grey',
        height : 60,
        width : '90%',
        borderRadius : 10,
        fontSize : 20,
        fontWeight : '400',
        backgroundColor: '#EEF7FE',
        marginLeft: 3,
        justifyContent: 'center'
    },
    input : {
        borderWidth: 0,
        borderColor: 'black',
        height : 55,
        width : '90%',
        fontSize : 20,
        fontWeight : '400',
        backgroundColor: '#EEF7FE',
        marginLeft: 5,
    },
    label : {
        fontSize : 17,
        fontWeight : 600,
        marginBottom : 5,
        marginTop : 15
    }
})
