import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';

export default class Button extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Image source={require("../img/logo6.png")} />

                <Text style={styles.h1}>Welcome to Metro Managment</Text>
                <Text style={styles.h2}>Please Enter Login Details to continue</Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    h1:{
        fontSize:20,
        color:'#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h2:{
        
        color:'#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }


});