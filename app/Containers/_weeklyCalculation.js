import React, { Component } from 'react';
import {
    Text,
    Button,
    Platform,
    View,
    StyleSheet,
    NetInfo,
    ScrollView,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavView from '../components/NavView';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import * as css from '../styles';
import { colors, font } from '../utill/_styleConstants'
import Api from '../lib/_serviceCall';
import { constUrls } from '../lib/_constantsUrls';
import Spinner from 'react-native-loading-spinner-overlay';

export class WeeklyCalculation extends Component {

    constructor(props) {
        super(props);

        //get user id from storage
        let userID = null;

        this.state = {
            pickup_jobs: [],
            username: null,
            user_id: 7,
            showProgress: false,
            hasUserId: false,
            hasTaking: true,
            hasPayment: true,
            hasExpence: true,
            _arrTableDataPickup: [],
            _arrTableDataPay: [],
            _arrTableDataExp: [],
            _amountTakings: 0,
            _amountPaymant: 0,
            _amountExpence: 0
        }



    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Weekly Calculation",
        ...css.header,
        headerLeft:
        <NavView onPress={() => navigation.navigate('DrawerOpen')} />
    })

    componentDidMount() {
        this.getDataFromDB();


    };

    //get data from API
    getDataFromAPI(userId) {

        Api.get(constUrls._pickupJobs + this.state.user_id)
            .then(json => {
                this.setState({
                    hasTaking: false,
                    hasPayment: false,
                    hasExpence: false,
                    showProgress: false,

                })
                var arrTempPick = [];
                var arrTempPickMain = [];
                var totalMaxPrice = 0

                json.map(function (item) {
                    // arr[i] = i;
                    if (item.Pickup_Time == null) {
                        arrTempPick.push('-');
                    } else {
                        arrTempPick.push(item.Pickup_Time);
                    }

                    if (item.Vehicle_Details == null) {
                        arrTempPick.push('-');
                    } else {
                        arrTempPick.push(item.Vehicle_Details);
                    }

                    if (item.Price_Quote == null) {
                        arrTempPick.push('-');
                    } else {
                        arrTempPick.push(item.Price_Quote);
                    }

                    if (item.Vehicle_Price == null) {
                        arrTempPick.push('-');
                    } else {
                        arrTempPick.push(item.Vehicle_Price);
                        totalMaxPrice = +totalMaxPrice + +item.Vehicle_Price;

                    }

                    if (item.Price_Paid == null) {
                        arrTempPick.push('-');
                    } else {
                        arrTempPick.push(item.Price_Paid);
                    }

                    arrTempPickMain.push(arrTempPick)
                    arrTempPick = [];
                })


                this.setState({
                    _arrTableDataPickup: arrTempPickMain,
                    _amountTakings: totalMaxPrice
                })

                this.storeData('pickupCal', json)

                Api.get(constUrls._expence + this.state.user_id)
                    .then(res => {


                        //add data to array

                        var arrTempExp = [];
                        var arrTempExpMain = [];
                        var totalExpence = 0;

                        res.map(function (item) {
                            // arr[i] = i;
                            if (item.Date_Expense == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Date_Expense);
                            }

                            if (item.Expense_By == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Expense_By);
                            }

                            if (item.Name == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Name);
                            }

                            if (item.Amount == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Amount);
                                totalExpence = +totalExpence + +item.Amount;
                            }

                            arrTempExpMain.push(arrTempExp)
                            arrTempExp = [];
                        })


                        this.setState({
                            _arrTableDataExp: arrTempExpMain,
                            _amountExpence: totalExpence
                        })
                        this.storeData('expCal', res)



                        Api.get(constUrls._payment + this.state.user_id)
                            .then(response => {



                                //add data to array
                                var totalPayment = 0;
                                var arrTempPay = [];
                                var arrTempPayMain = [];

                                response.map(function (item) {
                                    // arr[i] = i;
                                    if (item.Payment_Date == null) {
                                        arrTempPay.push('-');
                                    } else {
                                        arrTempPay.push(item.Payment_Date);
                                    }

                                    if (item.Amount == null) {
                                        arrTempPay.push('-');
                                    } else {
                                        arrTempPay.push(item.Amount);
                                        totalPayment = +totalPayment + +item.Amount
                                    }

                                    if (item.Reason == null) {
                                        arrTempPay.push('-');
                                    } else {
                                        arrTempPay.push(item.Reason);
                                    }

                                    if (item.Paid_By == null) {
                                        arrTempPay.push('-');
                                    } else {
                                        arrTempPay.push(item.Paid_By);
                                    }

                                    arrTempPayMain.push(arrTempPay)
                                    arrTempPay = [];
                                })


                                this.setState({
                                    _amountPaymant: totalPayment,
                                    _arrTableDataPay: arrTempPayMain
                                })

                                this.storeData('payCal', response)



                                this.setState({
                                    hasTaking: true,
                                    hasPayment: true,
                                    hasExpence: true,
                                    showProgress: false,
                                })


                            })
                            .catch(err => {
                                this.setState({
                                    hasTaking: false,
                                    hasPayment: false,
                                    hasExpence: false,
                                    showProgress: false,
                                })
                                console.log('err ' + err)
                            })


                    })
                    .catch(err => {
                        this.setState({
                            hasTaking: false,
                            hasPayment: false,
                            hasExpence: false,
                            showProgress: false,
                        })
                        console.log('err ' + err)
                    })




            })
            .catch(err => {
                this.setState({
                    hasTaking: false,
                    hasPayment: false,
                    hasExpence: false,
                    showProgress: false,
                })
                console.log('api call err ' + err)
            });
    }

    async getDataFromDB(type) {

        try {

            this.setState({
                hasTaking: false,
                hasPayment: false,
                hasExpence: false,
                showProgress: true,

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
                                this.getDataFromAPI(7)
                            } else {
                                ToastAndroid.show('Please Check your Internet Connection', ToastAndroid.LONG)
                                this.getDataFromDB('expCal')
                                this.getDataFromDB('pickupCal')
                                this.getDataFromDB('payCal')
                            };
                        });
                    }
                    else if (type == 'pickupCal') {

                        var arrTempPick = [];
                        var arrTempPickMain = [];

                        json.map(function (item) {
                            // arr[i] = i;
                            if (item.Pickup_Time == null) {
                                arrTempPick.push('-');
                            } else {
                                arrTempPick.push(item.Pickup_Time);
                            }

                            if (item.Vehicle_Details == null) {
                                arrTempPick.push('-');
                            } else {
                                arrTempPick.push(item.Vehicle_Details);
                            }

                            if (item.Price_Quote == null) {
                                arrTempPick.push('-');
                            } else {
                                arrTempPick.push(item.Price_Quote);
                            }

                            if (item.Vehicle_Price == null) {
                                arrTempPick.push('-');
                            } else {
                                arrTempPick.push(item.Vehicle_Price);
                            }

                            if (item.Price_Paid == null) {
                                arrTempPick.push('-');
                            } else {
                                arrTempPick.push(item.Price_Paid);
                            }

                            arrTempPickMain.push(arrTempPick)
                            arrTempPick = [];
                        })


                        this.setState({
                            _arrTableDataPickup: arrTempPickMain
                        })

                    } else if (type == 'expCal') {
                        var arrTempExp = [];
                        var arrTempExpMain = [];

                        json.map(function (item) {
                            // arr[i] = i;
                            if (item.Date_Expense == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Date_Expense);
                            }

                            if (item.Expense_By == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Expense_By);
                            }

                            if (item.Name == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Name);
                            }

                            if (item.Amount == null) {
                                arrTempExp.push('-');
                            } else {
                                arrTempExp.push(item.Amount);
                            }

                            arrTempExpMain.push(arrTempExp)
                            arrTempExp = [];
                        })


                        this.setState({
                            _arrTableDataExp: arrTempExpMain
                        })

                    } else if (type == 'payCal') {
                        var arrTempPay = [];
                        var arrTempPayMain = [];

                        json.map(function (item) {
                            // arr[i] = i;
                            if (item.Payment_Date == null) {
                                arrTempPay.push('-');
                            } else {
                                arrTempPay.push(item.Payment_Date);
                            }

                            if (item.Amount == null) {
                                arrTempPay.push('-');
                            } else {
                                arrTempPay.push(item.Amount);
                            }

                            if (item.Reason == null) {
                                arrTempPay.push('-');
                            } else {
                                arrTempPay.push(item.Reason);
                            }

                            if (item.Paid_By == null) {
                                arrTempPay.push('-');
                            } else {
                                arrTempPay.push(item.Paid_By);
                            }

                            arrTempPayMain.push(arrTempPay)
                            arrTempPay = [];
                        })


                        this.setState({
                            _arrTableDataPay: arrTempPayMain
                        })


                    }
                })
                .catch(error => {
                    this.setState({
                        hasTaking: false,
                        hasPayment: false,
                        hasExpence: false,
                        showProgress: false,
                    })
                    console.log('getting data from db errror!  ' + error)
                })
                ;

            this.setState({
                hasTaking: true,
                hasPayment: true,
                hasExpence: true,
                showProgress: false,
            })
        } catch (err) {
            this.setState({
                hasTaking: false,
                hasPayment: false,
                hasExpence: false,
                showProgress: false,
            })
            console.log('store err ' + err)

        }
    }
	/*
		async removeOldDatafromDB(type) {
			try {
				AsyncStorage.multiRemove(keys, (err) => {})
	
			} catch (error) {
				console.log('remove error - ' + error)
			}
			
	
			
		}
	*/

    async storeData(type, arr) {
        try {
            await AsyncStorage.setItem(type, JSON.stringify(arr));

        } catch (error) {
            console.log('storing error - ' + error)
            this.setState({
                hasTaking: false,
                hasPayment: false,
                hasExpence: false,
                showProgress: false,
            })
        }
    }

    render() {
        const tablePickupHead = ['Time', 'Vehicle Details', 'Min Price', 'Max Price', 'Price Paid'];
        const tablePayHead = ['Date', 'Amount', 'Reason', 'PaidBy'];
        const tableExpHead = ['Date', 'Driver', 'Expense Type', 'Amount'];


        return (
            <ScrollView style={styles.Scrollcontainer}>
                <View style={styles.container}>

                    <View style={styles.containerCal}>

                        <View style={styles.calTextContainer}>
                            <Text style={styles.calTextTitle}>Takings</Text>
                            <Text style={styles.calTextAns}>{this.state._amountTakings}</Text>
                        </View>

                        <View style={styles.calTextContainer}>
                            <Text style={styles.calTextTitle}>Payment</Text>
                            <Text style={styles.calTextAns}>{this.state._amountPaymant}</Text>
                        </View>

                        <View style={styles.calTextContainer}>
                            <Text style={styles.calTextTitle}>Expence</Text>
                            <Text style={styles.calTextAns}>{this.state._amountExpence}</Text>
                        </View>

                        <View style={styles.calTextContainer}>
                            <Text style={styles.calTextTitleBal}>Balance</Text>
                            <Text style={styles.calTextAnsBal}>{this.state._amountTakings - (this.state._amountPaymant + this.state._amountExpence)}</Text>
                        </View>
                    </View>

                    <View style={styles.containerPickup}>
                        <Text style={styles.title}>Takings </Text>
                        <View style={styles.viewUnderLine} />
                        {this.state.hasTaking &&
                            <Table borderStyle={{
                                borderWidth: 0.5,
                                borderColor: colors.pickupTableHeader
                            }}>
                                <Row data={tablePickupHead} style={styles.headPickup} textStyle={styles.text} />
                                <Rows data={this.state._arrTableDataPickup} style={styles.row} textStyle={styles.text} />
                            </Table>
                        }

                        {!this.state.hasTaking &&
                            <Text style={styles.errText}>You Don't have any Taking for This week.</Text>
                        }
                    </View>

                    <View style={styles.containerExpence}>
                        <Text style={styles.title}>Expence </Text>
                        <View style={styles.viewUnderLine} />

                        {this.state.hasExpence &&
                            <Table borderStyle={{
                                borderWidth: 0.5,
                                borderColor: colors.expTableHeader
                            }}>
                                <Row data={tableExpHead} style={styles.headExp} textStyle={styles.text} />
                                <Rows data={this.state._arrTableDataExp} style={styles.row} textStyle={styles.text} />
                            </Table>
                        }

                        {!this.state.hasExpence &&
                            <Text style={styles.errText}>You Don't have any Expence for This week.</Text>
                        }
                    </View>

                    <View style={styles.containerPayment}>
                        <Text style={styles.title}>Payments </Text>
                        <View style={styles.viewUnderLine} />

                        {this.state.hasPayment &&
                            <Table borderStyle={{ borderWidth: 0.5, borderColor: colors.payTableHeader }}>
                                <Row data={tablePayHead} style={styles.headPay} textStyle={styles.text} />
                                <Rows data={this.state._arrTableDataPay} style={styles.row} textStyle={styles.text} />
                            </Table>
                        }

                        {!this.state.hasPayment &&
                            <Text style={styles.errText}>You Don't have any Expence for This week.</Text>
                        }
                    </View>
                </View>
                <Spinner visible={this.state.showProgress} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    Scrollcontainer: {
        backgroundColor: colors.allViewsBackgroundColor
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.allViewsBackgroundColor
    },
    containerPickup: {
        marginTop: 10,
        flex: 1
    },
    containerExpence: {
        marginTop: 10,
        flex: 1
    },
    containerPayment: {
        marginTop: 10,
        flex: 1
    },
    containerCal: {
        flex: 0.5,
        flexDirection: 'row'

    },
    calTextContainer: {
        flex: 1,

    },
    viewUnderLine: {
        height: 1,
        marginTop: 6,
        marginBottom: 12,
        marginRight: 10,
        backgroundColor: '#666F73'
    },
    headExp: {
        height: 40,
        backgroundColor: colors.expTableHeader
    },
    headPickup: {
        height: 40,
        backgroundColor: colors.pickupTableHeader
    },
    headPay: {
        height: 40,
        backgroundColor: colors.payTableHeader
    },
    row: {
        height: 40
    },
    text: {
        textAlign: 'center'
    },
    calTextTitle: {
        textAlign: 'center'
    }, calTextTitleBal: {
        fontSize: font.fontLarge,
        textAlign: 'center'
    }, calTextAnsBal: {
        fontSize: font.fontLarge,
        textAlign: 'center'
    }, calTextAns: {
        textAlign: 'center',

    },
    errText: {
        marginVertical: 50,
        textAlign: 'center'
    }
})

