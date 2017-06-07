import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';

export default class Button extends Component{

    render(){

        return(

            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={this.props.onPress}
            >
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </TouchableNativeFeedback>

        );

    }
}

const styles = StyleSheet.create({
    
    buttonContainer:{
        
        alignSelf:'stretch',
        backgroundColor:'#6053CE',
        padding:16,
        margin:20,
        justifyContent:'center',
        alignItems:'center'

    },
    text:{
        color:'#fff',
        fontSize:28,
        fontFamily:'Ubuntu-L'
    }

});