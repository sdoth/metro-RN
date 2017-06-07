import React, { Component } from "react";

import {
    AppRegistry, ScrollView, Text, View, Image, StyleSheet
} from "react-native";

import {
    DrawerItems,
    DrawerNavigator,
    StackNavigator,
    TabNavigator
} from "react-navigation";

//Import screens
import { Home } from '../Containers/_home';
import _login from '../Containers/_login';
import Payment from '../Containers/_payment';
import Expence from '../Containers/_expence';
import FormCustomerNVehicleDetails from '../Containers/_formCustomerNVehicleDetails';
import TermsAndCondition from '../Containers/_termsAndCondition';
import { WeeklyCalculation } from '../Containers/_weeklyCalculation';
import AddPayment from '../Containers/_addPayment';
import FormMenualInvoice from '../Containers/_formMenualInvoice';
import AddExpence from '../Containers/_addExpence';
import Test from '../Containers/_testView'
import { colors, font } from '../utill/_styleConstants'

import Icon from 'react-native-vector-icons/Ionicons';
import * as css from '../styles';

const home_nav_stack = StackNavigator(
    {
        //route config
        HomeRoute: { screen: Home },
        FormRoute: { screen: FormCustomerNVehicleDetails },
        FormManualRoute: { screen: FormMenualInvoice },
        TermsAndCondition: { screen: TermsAndCondition },
        drawer_route: {
            screen: Home
        }
    },

);

const payment_nav_stack = StackNavigator({
    //route config
    PaymentRoute: { screen: Payment },
    AddPaymentRoute: { screen: AddPayment }
});

const expense_nav_Stack = StackNavigator({
    expenseRoute: { screen: Expence },
    addexpenseRoute: { screen: AddExpence }
});

const weekly_calculation_nav_Stack = StackNavigator({
    weeklyRoute: { screen: WeeklyCalculation },
});

const testStack = StackNavigator({
    testnav: { screen: FormCustomerNVehicleDetails },
});

const customeComponent = (props) => (

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
        <DrawerItems {...props} />
    </ScrollView>
)

const nav_drawer = DrawerNavigator(
    //route config
    {
        HomeRoute: {
            screen: home_nav_stack,
            navigationOptions: {
                header: null,
                drawerLabel: 'Home',
                drawerIcon: ({ tintColor }) => <Icon name="md-home" size={20} />
            }
        },
        PaymentRoute: {
            screen: payment_nav_stack,
            navigationOptions: {
                header: null,
                drawerLabel: 'My Payments',
                drawerIcon: ({ tintColor }) => <Icon name="md-cash" size={20} />
            }
        },
        ExpenseRoute: {
            screen: expense_nav_Stack,
            navigationOptions: {
                header: null,
                drawerLabel: 'My Expense',
                drawerIcon: ({ tintColor }) => <Icon name="md-clipboard" size={20} />
            }
        },
        CalculateRoute: {
            screen: weekly_calculation_nav_Stack,
            navigationOptions: {
                header: null,
                drawerLabel: 'Weekly Calculation',
                drawerIcon: ({ tintColor }) => <Icon name="md-calculator" size={20} />
            }
        }
    },

    //navigator config
    {
        contentComponent: customeComponent,
        drawerPosition: 'left',
        contentOptions: css.drawer
    }

);

const login_nav_stack = StackNavigator({
    login_route: {
        screen: _login
    },
    drawer_route: {
        screen: nav_drawer,
        navigationOptions: {
            header: null,
        }
    }
});

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

AppRegistry.registerComponent('metro', () => login_nav_stack);
