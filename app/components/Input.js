import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';

export default class Input extends Component{

    render(){

        return(
            <View style={styles.container}>
           
             <TextInput 
                style={styles.textInput}
                underlineColorAndroid='#666F73'
                placeholder={this.props.placeholder}
                placeholderTextColor='#B6C0C5'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                ></TextInput>
           
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container:{
        
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        padding:18
    },
    textInput:{
        fontSize:28,
        color:'#666F73',
         alignSelf:'stretch',
         textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        fontFamily:'Ubuntu-L'
        
    }
});