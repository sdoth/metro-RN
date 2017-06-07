import React, { Component } from 'react';

import {
    Text, Button, Platform, View, StyleSheet, TextInput, Picker, TouchableNativeFeedback, ScrollView
} from 'react-native';

import * as css from '../styles';

import Title from '../components/Title';

let c_years_picker;

export default class TermsAndCondition extends Component {

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


        this.setState({
            full_name: this.props.navigation.state.params.full_name,
            license: this.props.navigation.state.params.license,
            phone: this.props.navigation.state.params.phone,
            email: this.props.navigation.state.params.email,
            paddress: this.props.navigation.state.params.paddress,
            b_address: this.props.navigation.state.params.b_address,
            comments: this.props.navigation.state.params.comments,
            price: this.props.navigation.state.params.price,
            make: this.props.navigation.state.params.make,
            model: this.props.navigation.state.params.model,
            year: this.props.navigation.state.params.year,
            type_value: this.props.navigation.state.params.type_value,
            amount: this.props.navigation.state.params.amount,
            vin: this.props.navigation.state.params.vin,
            color: this.props.navigation.state.params.color,
            ODO: this.props.navigation.state.params.ODO,
            paid_by: this.props.navigation.state.params.paid_by,
            selling: this.props.navigation.state.params.selling,
            vehicle_details: this.props.navigation.state.params.vehicle_details,
        })



        //get years
        let years;
        c_years_picker = () => {
            let currentYear = new Date().getFullYear(), years = [];


            while (1970 <= currentYear) {
                years.push(startYear++);
                return <Picker.Item value={startYear++} label={startYear++} />

            }
            console.log('year ' + years)

        }

        let years1 = function (startYear) {
            var currentYear = new Date().getFullYear(), years = [];
            startYear = startYear || 1980;

            while (startYear <= currentYear) {
                years1.push(startYear++);
            }

            return years1;
        }

        console.log('year ' + years1)
    }



    static navigationOptions = ({ navigation }) => ({
        headerTitle: "Add Manual Invoice",
        ...css.header,

    })

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.customerContainer}>

                            <Text style={{ flex: -1, fontFamily: 'Ubuntu-M', fontSize: 18, padding: 8, paddingLeft: 10 }}>Customer Details</Text>


                            <View style={[styles.formItemContainer, { paddingTop: 2 }]}>
                                <Text style={styles.title}>Name</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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


                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>License</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>Phone</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>Email</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>P Address</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>B Address</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>Comments</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                        <View style={styles.vehicleContainer}>

                            <Text style={{ flex: -1, fontFamily: 'Ubuntu-M', fontSize: 18, padding: 8, paddingLeft: 10 }}>Vehicle Details</Text>

                            <View style={[styles.formItemContainer, { paddingLeft: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>Price</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff', fontFamily: 'Ubuntu-M' }]}
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

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Make</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5, fontFamily: 'Ubuntu-M' }}

                                    selectedValue={this.state.make}
                                    onValueChange={(lang) => this.setState({ make: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Model</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5, fontFamily: 'Ubuntu-M' }}

                                    selectedValue={this.state.model}
                                    onValueChange={(lang) => this.setState({ model: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Year</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5, fontFamily: 'Ubuntu-M' }}

                                    selectedValue={this.state.year}
                                    onValueChange={(lang) => this.setState({ year: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>


                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>Plate No.</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff', fontFamily: 'Ubuntu-M' }]}
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

                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>VIN</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Color</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5 }}

                                    selectedValue={this.state.color}
                                    onValueChange={(lang) => this.setState({ color: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>




                            <View style={[styles.formItemContainer, { paddingTop: 16 }]}>
                                <Text style={[styles.titleText, { fontSize: 14 }]}>ODO</Text>

                                <TextInput
                                    style={[styles.inputText, { fontSize: 14, backgroundColor: '#fff' }]}
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

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Paid By</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5 }}

                                    selectedValue={this.state.paid_by}
                                    onValueChange={(lang) => this.setState({ paid_by: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>

                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { flex: 1, fontSize: 14 }]}>Selling</Text>
                                <Picker
                                    mode='dropdown'
                                    style={{ width: 260, marginLeft: 5 }}

                                    selectedValue={this.state.selling}
                                    onValueChange={(lang) => this.setState({ selling: lang })}>
                                    <Picker.Item label="Paid Manualy" value="Paid Manualy" />
                                    <Picker.Item label="Paid" value="Paid" />
                                </Picker>
                            </View>



                            <View style={[styles.formItemContainer, { alignItems: 'center', flexDirection: 'row', paddingLeft: 16 }]}>
                                <Text style={[css.form.body_text, { fontSize: 16, fontFamily: 'Ubuntu-M' }]}>Compilance</Text>

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
                    <View>
                        <Text style={{ fontSize: 18 }}>Terms & Condition</Text>
                        <View style={styles.viewUnderLine} />

                    </View>
                   

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.SelectableBackground()}
                        onPress={() => this.onLoginPressed()} >
                        <View style={styles.buttonContainer}>
                            <Text style={styles.text}>Submit</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    viewUnderLine: {
        height: 1,
        marginTop: 6,
        marginBottom: 6,
        marginRight: 10,
        backgroundColor: '#666F73'
    },
    vehicleContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    customerContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
    formItemContainer: {
        alignItems: 'flex-start',
        padding: 2,
        paddingLeft: 6,

    }, title: {

    }, txtBody: {

    },
    titleText: {

        flex: -1,
        fontSize: 14,
        marginBottom: 10,
    },
    inputText: {
        alignSelf: 'stretch',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 0.4,
        paddingLeft: 20,


        fontSize: 14,

    },
    buttonContainer: {
        borderRadius: 10,
        alignSelf: 'stretch',
        backgroundColor: '#0686E4',
        padding: 8,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        color: '#fff',
        fontSize: 14,

    }
});