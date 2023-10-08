import React from 'react';
import {View,Text,TouchableOpacity, Image, StyleSheet} from 'react-native';



export const CircleButton= ({navigation, icon, run, label}) => {
  const ICONS = {
    Home: {
      uri: require('@assets/GroupHomeIcon1_5x.png')
    },
    Providers: {
      uri: require('@assets/GroupSuppliers1_5x.png')
    },
    Options: {
      uri: require('@assets/GroupOptions1_5.png')
    },
    Updates: {
      uri: require('@assets/GroupUpdates1_5x.png')
    },
    Plus: {
      uri: require('@assets/VectorPlus1_5x.png')
    },
  } 
    return (
        <>
        <View style={styles.btnlable}>
          <TouchableOpacity style={styles.container}
          onPress={run}
          >
            <Image
              width={40}
              height={40}
              source={ICONS[icon].uri}
              />            
          </TouchableOpacity>
          { label ? <Text>{icon}</Text>: null }
        </View>
        </>

    )
}


const styles = new StyleSheet.create({
    btnlable: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container : {
        backgroundColor: '#EEF7FE',
        height: 60,
        width: 60,
        borderRadius: '100%',
        marginTop: 0,
        marginBottom: 0,
        flexDirection : 'row',
        alignItems : 'center',//vertical center
        justifyContent: 'center',// vertical
        borderWidth : 1,
        borderColor : 'black',
        marginLeft: 5,
        marginRight: 5
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
