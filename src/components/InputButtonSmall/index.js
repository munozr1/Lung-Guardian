import React from 'react';
import {View,TouchableOpacity, Text, StyleSheet, TextInput} from 'react-native';
import { SvgUri } from 'react-native-svg';



export const InputButtonSmall= (props) => {

    
    return (
      <View style={[styles.container, props.break ? { marginBottom: 50 } : { marginBottom: 5 }]}>
        <Text style={styles.label}>
        {props.label}
        </Text>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.input }
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            secureTextEntry={props.hidden}
            onChangeText={text => props.run(props.label, text)}
            />
        </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    inputContainer : {
        width : '50%',
        marginLeft: 3,
        marginTop: 5,
        marginRight: 10,
        backgroundColor: '#EEF7FE',
        height: 40,
    },
    input : {
        height : 40,
        backgroundColor: '#EEF7FE',
        marginLeft: 5,
    },
    label : {
        fontSize : 17,
        fontWeight : 600,
        marginBottom : 5,
        marginTop : 15
    },
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',}
})
