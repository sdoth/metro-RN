import React, { Component } from 'react';


import NavView from '../components/NavView';

import NavViewRight from '../components/NavViewRight';
import { colors, font } from '../utill/_styleConstants';

import {
    Text, NetInfo, Button, Platform, View, StyleSheet, AsyncStorage, ToastAndroid, TextInput, Picker, TouchableNativeFeedback, TouchableOpacity
} from 'react-native';

import * as css from '../styles';

import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../lib/_serviceCall';
import { constUrls } from '../lib/_constantsUrls';
import Spinner from 'react-native-loading-spinner-overlay';

let serviceItems;
let driversList;

export default class AddExpence extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addPayment: true,
            amount_value: null,
            paidby_id: null,
            reason: null,
            response_type_data: null,
            driver_id: null,
            getPaidByListId: [],
            responseData: null,
            user_id: 7,
            hasDriverList: false,
            paidBy: 31
        }
    }

     async getdatafromdb() {
        console.log('usessssssd ');
        try {
            await AsyncStorage.getItem('login_details')
                .then(req => JSON.parse(req))
                .then(json => {

                    this.setState({
                        user_id: json.user_id
                    })
                   this.postExpenseData()
                    console.log('user id ' + json.user_id);
                })
                .catch(error => console.log('error!'));
        } catch (err) {
            console.log('expence err ' + err);
        }
    }


    async postExpenseData() {
        const { amount_value, type_value,user_id } = this.state;

       console.log('data '+ type_value+', '+amount_value +", "+user_id)

            fetch('http://www.metro.somee.com/api/UserAPI/InsertExpenses', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Expense_Type_ID: type_value,
                    Amount: amount_value,
                    User_ID: user_id,
                    Expense_No: null,

                })
            }).then((response) => {
                return response.json();
            })
                .then((jobs) => {
                    console.log('expence return: ', jobs)

                })
                .catch((error) => {
                    console.warn('expense return error: ', error)
                    this.show_alert_on_api_error("Api Error");

                })
        

    }

    //get paid by list data
    async getExpenseTypeListData() {


        var url = 'http://www.metro.somee.com/api/UserAPI/GetTypes';
       // var url = 'http://localhost:3000/getType';
        fetch(url, {
            method: "GET",
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        })
            .then((jobs) => {
                var tempArr = [];
                serviceItems = jobs.map((item) => {
                    tempArr.push(item.Setup_ID)
                    return <Picker.Item value={item.Setup_ID} label={item.Name} />
                });
                
                console.log("drive id ----" + tempArr);
            })
            .catch((error) => {
                console.warn('Actions - fetchJobs - recreived error: ', error)

            })


    }

    componentDidMount() {

        this.getExpenseTypeListData();
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Add New Expense",
        ...css.header,
        
    })



    render() {
        return (
              <View style={styles.container}>

                <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
                    <Text style={styles.titleText}>Paid By</Text>
                    <Picker
                        mode='dropdown'
                        style={{ width: 200, marginLeft: 5 }}
                        selectedValue={this.state.paidBy}
                        onValueChange={(lang) => this.setState({ paidBy: lang })}>
                        {driversList}
                    </Picker>
                </View>


                <View style={[styles.formItemContainer, { paddingTop: 2 }]}>

                    <Text style={[styles.titleText]}>Amount</Text>

                    <View style={styles.inputTextWrapContainer}>
                        <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={[styles.inputText]}
                            underlineColorAndroid='#fff'
                            placeholderTextColor='#B6C0C5'
                            autoCapitalize='none'
                            placeholder="amount"
                            autoCorrect={false}
                            returnKeyType='next'
                            value={this.state.amount}
                            onChangeText={amount => this.setState({ amount })}
                            onSubmitEditing={(event) => this.refs.reason.focus()}
                        ></TextInput>
                    </View>

                </View>

               
                <View style={styles.uploadBtnContainer}>
                    <TouchableOpacity >
                        <Icon
                            name="md-cloud-upload"
                            size={40}
                            color={colors.buttonLogin}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.saveBtnContainer}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => this.postPaymentData()}
                        style={styles.btn}
                    >
                        <View style={styles.btnTextCover}>
                            <Text style={styles.btnText}>Save</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Spinner visible={this.state.showProgress} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

            </View>

        )

    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.allViewsBackgroundColor, flex: 1,
        padding: 16
    }, btn: {
        alignItems: 'flex-end'
    },
    formItemContainer: {
        alignItems: 'flex-start',

    },
    titleText: {
        fontSize: font.fontMedium,
        marginBottom: 5
    },
    inputTextWrapContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 0.4,
        paddingLeft: 20,
        backgroundColor: '#D3D3D3',
        alignItems: 'center', height: 45

    },
    inputText: {
        marginTop: 0.1,
        marginBottom: 2,
        marginRight: 1,
        alignSelf: 'stretch',
        fontSize: font.fontMedium,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        flex: 1,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    icon: {
        paddingRight: 15
    }, btnTextCover: {
        alignSelf: 'stretch',
        backgroundColor: colors.buttonLogin,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }, btnText: {
        color: '#fff',
        fontSize: font.fontButton,
    }, saveBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 10
    }, uploadBtnContainer: {
        flex: -1,
        marginTop: 20,

    }
})