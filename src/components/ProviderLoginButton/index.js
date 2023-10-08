import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { ClipPath, SvgUri } from 'react-native-svg';



export const ProviderLoginButton= ({navigation, provider, url, navigate}) => {
    
    return (
        <>
        <TouchableOpacity style={styles.container}
        onPress={navigate}
        >
            <SvgUri
              width={40}
              height={40}
              uri={url}
              style={styles.svg}
              />
            <Text
            style={styles.text}
            >Continue with {provider}</Text>
        </TouchableOpacity>
        </>
    )
}


const styles = new StyleSheet.create({
    container : {
        backgroundColor: '#EEF7FE',
        height: 70,
        width: '100%',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        flexDirection : 'row',
        alignItems : 'center'//vertical center
    },
    text : {
        padding: 0,
        marginRight: 15,
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'right'
    },
    svg : {
        marginLeft: 10,
        textAlign: 'right',
        marginRight: 40
    }
})
