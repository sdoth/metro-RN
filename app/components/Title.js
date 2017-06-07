import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Title extends Component {

    render() {

        return (

            <View style={styles.titleContainer}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>

        );

    }
}

const styles = StyleSheet.create({

    titleContainer: {

        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding:8,
        marginTop:20

    },
    text: {
        color: '#666F73',
        fontSize: 20,
    }

});