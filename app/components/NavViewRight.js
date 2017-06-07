import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {
    View
} from 'react-native';

export default class NavViewRight extends Component {

    render() {

        return (

            <View style={{ paddingRight:16,marginRight:20,flexDirection:'row'}}>



                <Icon
                    name="md-checkmark"
                    size={30}
                    color='white'
                    onPress={this.props.onPress} />

            </View>

        );

    }
}