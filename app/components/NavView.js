import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    View
} from 'react-native';

export default class NavView extends Component {

    render() {

        return (

            <View style={{ paddingLeft: 16 }}>
                <Icon
                    name="md-menu"
                    size={30}
                    color='white'
                    onPress={this.props.onPress} />
            </View>

          

        );

    }
}