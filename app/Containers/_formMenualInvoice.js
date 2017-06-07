import React, { Component } from 'react';

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

export default class FormMenualInvoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleDetails: true,
      paymentMethod: null,
      amount: null,
      paidStatus:8
    }
  }

  componentDidMount() {
    //set variable
    this.setState({
      vehicleDetails: this.props.navigation.state.params.Vehicle_Details,
      amount: this.props.navigation.state.params.Price,
    })
  }

  async postPaymentData() {
        const { vehicleDetails, amount, paidStatus } = this.state;


        console.log('url http://www.metro.somee.com/api/UserAPI/InsertAction');
        console.log('value ' + paidStatus + ", " + amount + ", " );

        fetch('http://www.metro.somee.com/api/UserAPI/InsertPayment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Status_Id: paidStatus,
                Price_Paid: amount,
               

            })
        }).then((response) => {
          
            return response.json();
        })
            .then((jobs) => {
                console.log('action: ', jobs)
                this.props.navigation.goBack()

            })
            .catch((error) => {
                console.warn('Actions - fetchJobs - recreived error: ', error)
                this.props.navigation.goBack()
            })


    }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Add Manual Invoice",
    ...css.header,

  })

  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.formItemContainer, { paddingTop: 2 }]}>

          <Text style={[styles.titleText]}>Vehicle Details</Text>

          <View style={styles.inputTextWrapContainer}>
            <Icon name="md-cash" size={20} color="#000" style={styles.icon} />
            <TextInput
              style={[styles.inputText]}
              underlineColorAndroid='#fff'
              placeholderTextColor='#B6C0C5'
              autoCapitalize='none'
              placeholder="vehicle details"
              autoCorrect={false}
              returnKeyType='next'
              value={this.state.vehicleDetails}
              onChangeText={vehicleDetails => this.setState({ vehicleDetails })}
              onSubmitEditing={(event) => this.refs.reason.focus()}
            ></TextInput>
          </View>

        </View>

        <View style={[styles.formItemContainer, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={styles.titleText}>Paid By</Text>
          <Picker
            mode='dropdown'
            style={{ width: 200, marginLeft: 5 }}
            selectedValue={this.state.paidStatus}
            onValueChange={(lang) => this.setState({ paidStatus: lang })}>
            <Picker.Item label="Paid Manualy" value="8" />
            <Picker.Item label="Cancle" value="3" />
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
    );
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