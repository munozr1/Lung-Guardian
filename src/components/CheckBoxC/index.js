import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';




export const CheckBoxC= (props) => {

  const [checked, setChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.onpress();
  };

    return (
      <View style={[styles.container, props.break ? { marginBottom: 50 } : { marginBottom: 5 }]}>
        <Text style={styles.label}>
        {props.label}
        </Text>
        <View >
            <CheckBox
            checked={checked}
            onPress={handleCheckboxChange}
            ></CheckBox>
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
