import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    AsyncStorage,
    View,
    Button,
    Platform,
    StyleSheet,
    ListView,
    ToastAndroid,
    BackHandler,
    FlatList,Image,
    TouchableHighlight
} from 'react-native';
import { colors, font } from '../utill/_styleConstants'

export default class Test extends Component {
    render() {
        return (
            <ScrollView
                style={styles.container}>
                <View style={styles.mainView}>
                    <View style={styles.profileContainer}>
                        <View >
                            <Image style={styles.profileImageContaienr} source={require('../img/placeholder.png')}/>
                        </View>
                        <Text style={styles.name}>Rizwan</Text>
                       
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.drawerBackground
    },
    mainView: {
        flex: 1,
        height: 300,
        alignItems: 'center',
        backgroundColor: colors.drawerprofileViewBackground
    },
    profileContainer: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    profileImageContaienr: {
        height: 100,
        borderRadius: 100,
        width: 100,
    },
    name: {
        paddingTop: 14,
        fontSize: font.fontLarge,
        color: '#fff',
        alignItems: 'center',

    },
    info: {
        fontSize: font.fontMedium,
        color: colors.drawerprofileViewBackground,
        alignItems: 'center',

    }
})