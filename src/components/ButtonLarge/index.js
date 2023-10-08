import React  from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';


export const ButtonLarge= (props) => {
    return (
        <View style={props.style}>
        <TouchableOpacity style={[styles.container, props.pcolor ? { backgroundColor: props.pcolor } : { backgroundColor: '#346AFE' }]}
        onPress={props.run}
        >
            <Text
            style={styles.text}
            >{props.text}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    container : {
        height: 60,
        width: '90%',
        borderRadius: 10,
        alignItems : 'center',//horizontal center
        justifyContent: 'center'// vertical
    },
    text : {
        fontSize: 20,
        fontWeight: 600,
        color: 'white'
    },
})
