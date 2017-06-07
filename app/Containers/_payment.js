import React, { Component } from 'react';
import {
	Text, View, TextInput, TouchableHighlight, ListView, StyleSheet, AsyncStorage, NetInfo, ToastAndroid
} from 'react-native';
import * as css from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import NavView from '../components/NavView';
import ExpencePaymentListRow from '../components/ExpencePaymentListRow'
import ActionButton from 'react-native-action-button';
import Api from '../lib/_serviceCall';
import { constUrls } from '../lib/_constantsUrls';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors, font } from '../utill/_styleConstants';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

export default class Payment extends Component {

	constructor(props) {
		super(props);

		const cs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			user_id: 7,
			paid_by: null,
			showProgress: false,
			amount: null,
			reason: null,
			date: null,
			logged_by: null,
			//if 1 data saved to server else waiting for internet
			wait_for_server: 0,
			loading_listview: 0,
			dataSource: cs.cloneWithRows([]),
			hasAnyPayment: true,
			_arrTableDataPay: null,
			hasPayment: false
		}
	}

	componentDidMount() {
		this.getDataFromDB(1);


	};

	getDataFromAPI(userId) {
		this.setState({
			showProgress: true,
			hasPayment: false,
		})

		Api.get(constUrls._payment + this.state.user_id)
			.then(response => {
				//add data to array
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

				this.storeData('pay', response)



				this.setState({
					hasPayment: true,
					showProgress: false,
				})


			})
			.catch(err => {
				this.setState({
					hasPayment: false,
					showProgress: false,
				})
				console.log('err ' + err)
			})



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
								this.getDataFromDB('pay')
							};
						});
					} else if (type == 'pay') {
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












	static navigationOptions = ({ navigation }) => ({
		headerTitle: "My Payments",
		...css.header,
		headerLeft:
		<NavView onPress={() => navigation.navigate('DrawerOpen')} />
	})
	/*
	
		async getPaymentList() {
			console.log('user id ' + this.state.user_id);
			this.setState({
				showProgress: true
			})
			//var url = "http://localhost:3000/payments";
			var url = "http://www.metro.somee.com/api/UserAPI/ViewPaymentsAsync?userID=" + this.state.user_id;
			//var url = "http://localhost:50292/api/UserAPI/ViewAssignedjobs?userID=7";
			console.log(url)
			//adb reverse tcp:3333 tcp:3333
			fetch(url,
				{
					method: "GET",
					dataType: 'json',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				})
				.then((response) => {
					return response.json();
				})
				.then((jobs) => {
					console.log('paymnet: ', jobs)
	
					if (jobs.length > 0) {
						this.setState({
							hasAnyPayment: true,
							showProgress: false,
							dataSource: this.state.dataSource.cloneWithRows(jobs)
	
						})
					} else {
						this.setState({
							hasAnyPayment: false,
	
						})
					}
				})
				.catch((error) => {
					console.warn('Actions - fetchJobs - recreived error: ', error)
					this.show_alert_on_api_error("Api Error");
					this.setState({
						showProgress: false
					})
				})
		}
	
	*/
	render() {
		const tablePayHead = ['Date', 'Amount', 'Reason', 'PaidBy'];


		return (



			<View style={styles.container}>


				<View style={styles.containerPayment}>
					<Text style={styles.title}>Payments </Text>
					<View style={styles.viewUnderLine} />

					{this.state.hasPayment &&
						<Table borderStyle={{ borderWidth: 0.5, borderColor: colors.expTableHeader }}>
							<Row data={tablePayHead} style={styles.headPay} textStyle={styles.text} />
							<Rows data={this.state._arrTableDataPay} style={styles.row} textStyle={styles.text} />
						</Table>
					}

					{!this.state.hasPayment &&
						<Text style={styles.errText}>You Don't have any Expence for This week.</Text>
					}
				</View>


				<ActionButton
					buttonColor={colors.actionBtn}
					onPress={() => { this.props.navigation.navigate('AddPaymentRoute') }}
				/>

				<Spinner visible={this.state.showProgress} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

			</View>

		);

	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		padding: 16,
		backgroundColor: colors.allViewsBackgroundColor
	}, title: {
		fontSize: font.fontLarge
	}, row: {
		height: 40
	},
	containerPayment: {
		marginTop: 10,
		flex: 1
	}, headPay: {
		height: 40,
		backgroundColor: colors.expTableHeader
	}, containerCal: {
		flex: 0.5,
		flexDirection: 'row'

	},
	viewUnderLine: {
		height: 1,
		marginTop: 6,
		marginBottom: 12,
		marginRight: 10,
		backgroundColor: '#666F73'
	},

	text: {
		textAlign: 'center'
	},

	errText: {
		marginVertical: 50,
		textAlign: 'center'
	}
})


