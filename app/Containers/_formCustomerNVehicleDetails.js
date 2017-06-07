import React, { Component } from 'react';

import {
    Text, Button, Platform, View, StyleSheet, TextInput, Picker, TouchableNativeFeedback
} from 'react-native';

import * as css from '../styles';

import Title from '../components/Title';

import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../lib/_serviceCall';
import { constUrls } from '../lib/_constantsUrls';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors, font } from '../utill/_styleConstants';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

let c_years_picker;
let _vehicle_details_with_split;

export default class FormCustomerNVehicleDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            full_name: null,
            license: null,
            phone: null,
            email: null,
            paddress: null,
            b_address: null,
            comments: null,
            price: null,
            make: null,
            model: null,
            year: null,
            type_value: null,
            amount: null,
            vin: null,
            color: null,
            ODO: null,
            paid_by: null,
            selling: null,
            vehicle_details: null,
        }
    }
    componentDidMount() {

        const { params } = this.props.navigation.state;

        //set variable

        var _vehicleDetails = params.Vehicle_Details
        var temp = _vehicleDetails.split(' ');
        console.log("split " + temp[1])

        this.setState({
            make: temp[0],
            model: temp[1],
            year: temp[2],
            phone: params.Phone,
            paddress: params.P_Addres,
            b_address: params.R_Addres,
            price: params.Price,
            paid_by: params.Paid_by
        })

        //   this.getDataFromAPI()

        /*
                 var word = params.vehicleDetails;
                 //var word_for_split = word.split(' ');
                  console.log('word_for_split ' + word_for_split)
                
                this.setState({
                    make:word[0],
                    model:word[1],
                    year:word[2]
                })
        */

    }

    getDataFromAPI() {
        this.setState({
            showProgress: true,
            hasDriverList: false,
        })

        Api.get(constUrls._getColor)
            .then(response => {

                driversList = response.map(function (item) {
                    console.log('Driver_ID' + item.Name)
                    return <Picker.Item label={item.Name} value={item.Setup_ID} key={item.Driver_ID} />
                })

                // this.storeData('driversList', response)

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


    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Add Manual Invoice",
        ...css.header,

    })

    render() {

        //var vehicleDetails = this.getVehicleDeails();


        return (
            <View style={styles.container}>

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={styles.customerContainer}>



                        <View style={[styles.formItemContainer, { paddingTop: 2 }]}>

                            <Text style={[styles.titleText]}>Name</Text>

                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    placeholderTextColor='#B6C0C5'
                                    autoCapitalize='none'
                                    placeholder="Full Name"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    value={this.state.full_name}
                                    onChangeText={full_name => this.setState({ full_name })}
                                    onSubmitEditing={(event) => this.refs.license.focus()}
                                ></TextInput>
                            </View>

                        </View>


                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>License</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    ref={'license'}
                                    placeholderTextColor='#B6C0C5'
                                    placeholder="license"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    value={this.state.license}
                                    onChangeText={license => this.setState({ license })}
                                    onSubmitEditing={(event) => this.refs.contact.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={styles.titleText}>Phone</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="phone"
                                    autoCorrect={false}
                                    ref={'phone'}
                                    placeholderTextColor='#B6C0C5'
                                    returnKeyType='next'
                                    value={this.state.phone}
                                    onChangeText={phone => this.setState({ phone })}
                                    onSubmitEditing={(event) => this.refs.email.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>Email</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="emial"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    ref={'emial'}
                                    placeholderTextColor='#B6C0C5'
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                    onSubmitEditing={(event) => this.refs.p_address.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>P Address</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="p address"
                                    autoCorrect={false}
                                    ref={'p_address'}
                                    placeholderTextColor='#B6C0C5'
                                    returnKeyType='next'
                                    value={this.state.paddress}
                                    onChangeText={paddress => this.setState({ paddress })}
                                    onSubmitEditing={(event) => this.refs.b_address.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>B Address</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="b address"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    ref={'b_address'}
                                    placeholderTextColor='#B6C0C5'
                                    value={this.state.b_address}
                                    onChangeText={b_address => this.setState({ b_address })}
                                    onSubmitEditing={(event) => this.refs.comments.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>Comments</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="comments"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    value={this.state.comments}
                                    ref={'comments'}
                                    placeholderTextColor='#B6C0C5'
                                    onChangeText={comments => this.setState({ comments })}
                                    onSubmitEditing={(event) => this.refs.reason.focus()}
                                ></TextInput>
                            </View>
                        </View>

                    </View>

                    <View style={styles.middleline} />

                    <View style={[styles.vehicleContainer]}>


                        <View style={[styles.formItemContainer, { paddingLeft: 16 }]}>
                            <Text style={[styles.titleText]}>Price</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="price"
                                    autoCorrect={false}
                                    returnKeyType='next'

                                    placeholderTextColor='#B6C0C5'
                                    value={this.state.price}
                                    onChangeText={price => this.setState({ price })}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={[styles.titleText]}>make</Text>
                            <Text style={[styles.titleText]}>{this.state.make}</Text>
                        </View>

                        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={[styles.titleText]}>Model</Text>
                            <Text style={[styles.titleText]}>{this.state.model}</Text>
                        </View>

                        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={styles.titleText}>Year</Text>
                            <Text style={[styles.titleText]}>{this.state.year}</Text>
                        </View>


                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>Plate No.</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="registration plate"
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    placeholderTextColor='#B6C0C5'
                                    value={this.state.amount}
                                    onChangeText={amount => this.setState({ amount })}
                                    onSubmitEditing={(event) => this.refs.reason.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>VIN</Text>
                            <View style={styles.inputTextWrapContainer}>
                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="vehicle vin number"
                                    autoCorrect={false}
                                    placeholderTextColor='#B6C0C5'
                                    returnKeyType='next'
                                    value={this.state.vin}
                                    onChangeText={amount => this.setState({ vin })}
                                    onSubmitEditing={(event) => this.refs.reason.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={styles.titleText}>Color</Text>
                            <Picker
                                mode='dropdown'
                                style={{ width: 200, marginLeft: 5 }}

                                selectedValue={this.state.color}
                                onValueChange={(lang) => this.setState({ color: lang })}>
                                <Picker.Item label="Red" value="Paid Manualy" />
                                <Picker.Item label="Black" value="Paid" />
                                <Picker.Item label="Green" value="Paid Manualy" />
                                <Picker.Item label="White" value="Paid" />
                            </Picker>
                        </View>




                        <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                            <Text style={[styles.titleText]}>ODO</Text>
                            <View style={styles.inputTextWrapContainer}>

                                <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
                                <TextInput
                                    style={[styles.inputText]}
                                    underlineColorAndroid='#fff'
                                    autoCapitalize='none'
                                    placeholder="odo meter reading"
                                    placeholderTextColor='#B6C0C5'
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    value={this.state.odo}
                                    onChangeText={odo => this.setState({ odo })}
                                    onSubmitEditing={(event) => this.refs.reason.focus()}
                                ></TextInput>
                            </View>
                        </View>

                        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={styles.titleText}>Paid By</Text>
                            <Picker
                                mode='dropdown'
                                style={{ width: 200, marginLeft: 5 }}

                                selectedValue={this.state.paid_by}
                                onValueChange={(lang) => this.setState({ paid_by: lang })}>
                                <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                <Picker.Item label="Paid" value="Paid" />
                            </Picker>
                        </View>

                        <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16, justifyContent: 'space-between' }]}>
                            <Text style={styles.titleText}>Selling</Text>
                            <Picker
                                mode='dropdown'
                                style={{ width: 200, marginLeft: 5 }}

                                selectedValue={this.state.selling}
                                onValueChange={(lang) => this.setState({ selling: lang })}>
                                <Picker.Item label="Without Rego" value="Without Rego" />
                                <Picker.Item label="Rego" value="Rego" />
                            </Picker>
                        </View>



                        <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                            <Text style={styles.titleText}>Compilance</Text>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                    <Picker
                                        mode='dropdown'
                                        style={{ width: 100, marginLeft: 5 }}

                                        selectedValue={this.state.c_month}
                                        onValueChange={(lang) => this.setState({ c_month: lang })}>
                                        <Picker.Item label="00" value="00" />
                                        <Picker.Item label="01" value="01" />
                                    </Picker>
                                </View>
                                <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                    <Picker
                                        mode='dropdown'
                                        style={{ width: 100, marginLeft: 5 }}

                                        selectedValue={this.state.c_year}
                                        onValueChange={(lang) => this.setState({ c_year: lang })}>

                                        <Picker.Item label="99" value="99" />
                                    </Picker>
                                </View>
                            </View>
                        </View>



                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10 }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => this.props.navigation.navigate('TermsAndCondition', {
                            full_name: this.state.full_name,
                            license: this.state.license,
                            phone: this.state.phone,
                            email: this.state.email,
                            paddress: this.state.paddress,
                            b_address: this.state.b_address,
                            comments: this.state.comments,
                            price: this.state.price,
                            make: this.state.make,
                            model: this.state.model,
                            year: this.state.year,
                            type_value: this.state.type_value,
                            amount: this.state.amount,
                            vin: this.state.vin,
                            color: this.state.color,
                            ODO: this.state.ODO,
                            paid_by: this.state.paid_by,
                            selling: this.state.selling,
                            vehicle_details: this.state.vehicle_details,
                        })}
                    >
                        <View style={{
                            alignSelf: 'stretch',
                            backgroundColor: '#0686E4',
                            padding: 16,
                            borderRadius: 10,
                            flex: 1,
                            justifyContent: 'center',
                            margin: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text}>Save</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        );
    }

}

var styles = StyleSheet.create({
    middleline: {
        width: 1,
        backgroundColor: '#e0e0e0'
        , margin: 20
    },
    vehicleContainer: {
        flex: 1,
        paddingRight: 16
    },
    customerContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1, backgroundColor: '#fff', paddingTop: 16
    },
    formItemContainer: {
        padding: 2,
        paddingLeft: 16,
        alignItems: 'flex-start',
    },
    titleText: {
        fontSize: 14,
        marginBottom: 10
    },
    inputTextWrapContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 0.4,
        paddingLeft: 20,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',

    }, icon: {
        paddingRight: 15
    },
    inputText: {
        marginTop: 0.1,
        marginBottom: 2,
        marginRight: 1,
        alignSelf: 'stretch',
        fontSize: 14,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        flex: 1, paddingLeft: 25,
        backgroundColor: '#fff', height: 40
    },
    buttonContainer: {
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: '#6053CE',
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        color: '#fff',
        fontSize: 18,
    }
});