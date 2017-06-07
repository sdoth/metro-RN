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

export default class AddPayment extends Component {
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
            driverName: 31
        }
    }

    async postPaymentData() {
        const { amount_value, reason, driver_id, user_id } = this.state;


        console.log('url http://www.metro.somee.com/api/UserAPI/InsertPayment');
        console.log('value ' + amount_value + ", " + driver_id + ", " + user_id + ", " + reason);

        fetch('http://www.metro.somee.com/api/UserAPI/InsertPayment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Amount: amount_value,
                Paid_By: 17,
                User_ID: user_id,
                Reason: reason,

            })
        }).then((response) => {
            return response.json();
        })
            .then((jobs) => {
                console.log('paymnet: ', jobs)

            })
            .catch((error) => {
                console.warn('Actions - fetchJobs - recreived error: ', error)
            })


    }

    //get paid by list data
    async getExpenseTypeListData() {


        var url = 'http://www.metro.somee.com/api/UserAPI/GetAllDrivers';
        //var url = 'http://localhost:3000/getDrivers';
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
                var tempArr = this.state.getPaidByListId.slice();
                serviceItems = jobs.map((item) => {
                    tempArr.push(item.Driver_ID)
                    return <Picker.Item value={item.Driver_ID} label={item.Name} />
                });

                this.setState({
                    getPaidByListId: tempArr
                })

                console.log("drive id ----" + this.state.getPaidByListId);


            })
            .catch((error) => {
                console.warn('Actions - fetchJobs - recreived error: ', error)
                this.show_alert_on_api_error("Api Error");

            })


    }

    componentDidMount() {

          this.getDataFromDB();

        

    }


    postPaymentData() {
        NetInfo.isConnected.fetch().then(isConnected => {
            var postdata = {
                "Amount": this.state.amount,
                "Paid_By": this.state.driverName,
                "User_ID": this.state.user_id,
                "Reason": this.state.reason
            }
            if (isConnected) {
                //is online get data from online otherwise get from db
                this.postToAPI(postdata)

            } else {
                ToastAndroid.show('We are saving your data for Offline.When Next time Internet connect we send it to Server.', ToastAndroid.LONG)
                this.putPostDataToDb('postData', postdata)
            };
        });
    }

    postToAPI(postdata) {
        this.setState({
            showProgress: true,
            hasDriverList: false,
        })
        console.log('postdata ' + postdata.Amount + ', ' + postdata.Paid_By + ', ' + postdata.User_ID + ', ' + postdata.Reason)
        Api.post(constUrls._insertPayment, postdata)
            .then(json => {
                console.log('success ' + json)
                goBack()
                this.removeOldDatafromDB('postData')
            })
            .catch(err => {
                this.setState({
                    hasDriverList: true,
                    showProgress: false,
                })
                this.props.navigation.goBack()
                this.removeOldDatafromDB('postData')
                console.log('err ' + err)
            })

        this.setState({
            hasDriverList: true,
            showProgress: false,
        })
    }

    getDataFromAPI() {
        this.setState({
            showProgress: true,
            hasDriverList: false,
        })

        Api.get(constUrls._getDrivers)
            .then(response => {

                driversList = response.map(function (item) {
                    console.log('Driver_ID' + item.Driver_ID)
                    return <Picker.Item label={item.Name} value={item.Driver_ID} key={item.Driver_ID} />
                })

                this.storeData('driversList', response)

                this.setState({
                    hasDriverList: true,
                    showProgress: false,
                })


            })
            .catch(err => {
                this.setState({
                    hasDriverList: false,
                    showProgress: false,
                })
                console.log('err ' + err)
            })



    }

    async getDataFromDB(type) {
        var type = type;

        try {

            this.setState({
                showProgress: true,
                hasDriverList: false,

            })

            await AsyncStorage.getItem(type)
                .then(req => JSON.parse(req))
                .then(json => {

                    if (type == 'login_details') {
                        this.setState({
                            user_id: json.user_id
                        })

                        var isOnline = false;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                //is online get data from online otherwise get from db
                //this.offlineSync();
                this.getDataFromAPI(7)
                //check if data have to post

            } else {
                ToastAndroid.show('Please Check your Internet Connection', ToastAndroid.LONG)
                this.getDataFromDB('driversList')
            };
        });
                    } else if (type == 'driversList') {


                        driversList = json.map(function (item) {
                            console.log('Driver_ID' + item.Driver_ID)
                            return <Picker.Item label={item.Name} value={item.Driver_ID} key={item.Driver_ID} />
                        })

                        this.setState({
                            showProgress: false,
                            hasDriverList: false,

                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        hasDriverList: false,
                        showProgress: false,
                    })
                    console.log('getting data from db errror!  ' + error)
                })
                ;


        } catch (err) {
            this.setState({
                hasDriverList: false,
                showProgress: false,
            })
            console.log('get data from db err ' + err)

        }
    }

    async removeOldDatafromDB(type) {
        try {
            AsyncStorage.multiRemove(keys, (err) => { })

        } catch (error) {
            console.log('remove error - ' + error)
        }

    }


    async storeData(type, arr) {
        try {

            await AsyncStorage.setItem(type, JSON.stringify(arr));

        } catch (error) {
            console.log('storing error - ' + error)
            this.setState({
                hasDriverList: false,
                showProgress: false,
            })
        }
    }

    async putPostDataToDb(type, arr) {
        var type = type;
        var id = 0

        try {
            this.setState({
                showProgress: true,

            })
            console.log('post data to db ' + arr.Amount + ', ' + arr.Paid_By + ', ' + arr.User_ID + ', ' + arr.Reason)

            await AsyncStorage.setItem('postData', JSON.stringify(arr));
            this.setState({
                showProgress: false,
            })
        } catch (error) {
            console.log('offilne sync storing error - ' + error)
            this.setState({

                showProgress: false,
            })
        }
    }

    async offlineSync() {
        try {

            this.setState({
                showProgress: true,
            })

            await AsyncStorage.getItem('postData')
                .then(req => JSON.parse(req))
                .then(json => {
                    console.log("ccc ")

                    console.log("id " + json.Amount)


                    this.postToAPI(json)



                    this.setState({
                        showProgress: false,
                    })

                })

                .catch(error => {
                    this.setState({
                        showProgress: false,
                    })
                    console.log('getting data from db errror!  ' + error)
                })
                ;


        } catch (err) {
            this.setState({

                showProgress: false,
            })
            console.log('store err ' + err)

        }
    }


    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Add New Payment",
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
                        selectedValue={this.state.driverName}
                        onValueChange={(lang) => this.setState({ driverName: lang })}>
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

                <View style={[styles.formItemContainer]}>

                    <Text style={[styles.titleText]}>Reason</Text>

                    <View style={styles.inputTextWrapContainer}>
                        <Icon name="md-mic" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={[styles.inputText]}
                            underlineColorAndroid='#fff'
                            placeholderTextColor='#B6C0C5'
                            autoCapitalize='none'
                            placeholder="reason"
                            autoCorrect={false}
                            ref={'reason'}
                            returnKeyType='next'
                            value={this.state.reason}
                            onChangeText={reason => this.setState({ reason })}
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