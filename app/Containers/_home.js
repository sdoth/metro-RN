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
	FlatList, NetInfo,
	TouchableHighlight,
} from 'react-native';
import * as css from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import NavView from '../components/NavView';
import Title from '../components/Title';
import JobListView from '../components/JobListView';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import Spinner from 'react-native-loading-spinner-overlay';
import { colors, font } from '../utill/_styleConstants';
import Api from '../lib/_serviceCall';
import { constUrls } from '../lib/_constantsUrls';

export class Home extends Component {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		//get user id from storage
		let userID = null;

		this.state = {

			pickup_jobs: [],
			username: null,
			user_id: 7,
			showProgress: false,
			hasUserId: false,
			dataSource: ds.cloneWithRows([]),
			dataSource2: ds.cloneWithRows([]),
			hasPickupJobs: true,
			hasAssignJobs: true,
		}
	}

	static navigationOptions = ({ navigation }) => ({
		headerTitle: "Home",
		...css.header,
		headerLeft:
		<NavView onPress={() => navigation.navigate('DrawerOpen')} />

	})

	componentDidMount() {
		this.getDataFromDB("login_details");

		var isOnline = false;

		NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected) {
				//is online get data from online otherwise get from db
				this.getDataFromAPI()
			} else {
				ToastAndroid.show('Please Check your Internet Connection', ToastAndroid.LONG)
				this.getDataFromDB('ass')
				this.getDataFromDB('pickup')
			};
		});
		//this.getAssignJobList();
		//this.getPickupJobList();

	};

	//get data from API
	getDataFromAPI(userId) {
		this.setState({
			showProgress: true,
			hasAssignJobs: false,
			hasPickupJobs: false,
		})
if (this.state.user_id != null) {
		Api.get(constUrls._assignJobs + this.state.user_id)
			.then(json => {
				this.setState({
					hasAssignJobs: true,
					showProgress: false,
					dataSource: this.state.dataSource.cloneWithRows(json)

				})

				this.storeData('ass', json)

				Api.get(constUrls._pickupJobs + this.state.user_id)
					.then(res => {

						this.setState({
							hasPickupJobs: true,
							showProgress: false,
							dataSource2: this.state.dataSource2.cloneWithRows(res)

						})

						this.storeData('pickup', res)
					})
					.catch(err => {
						this.setState({
							hasPickupJobs: false,
							showProgress: false
						})
						console.log('err ' + err)
					})
			})
			.catch(err => {
				this.setState({
					hasAssignJobs: false,
					showProgress: false
				})
				console.log('api call err ' + err)
			});
}
	}

	async getDataFromDB(type) {

		try {

			this.setState({
				showProgress: true,
				hasAssignJobs: false,
				hasPickupJobs: false,
			})

			await AsyncStorage.getItem(type)
				.then(req => JSON.parse(req))
				.then(json => {

					if (type == 'login_details') {
						this.setState({
							user_id: json.user_id
						})
					}
					else if (type == 'ass') {
						this.setState({
							hasAssignJobs: true,
							showProgress: false,
							dataSource: this.state.dataSource.cloneWithRows(json)
						})
					} else if (type == 'pickup') {
						this.setState({
							hasPickupJobs: true,
							showProgress: false,
							dataSource2: this.state.dataSource2.cloneWithRows(json)
						})
					}
				})
				.catch(error => {
					this.setState({
						hasPickupJobs: false,
						hasAssignJobs: false,
						showProgress: false
					})
					console.log('getting data from db errror!  ' + error)
				})
				;
		} catch (err) {

			console.log('store err ' + err)
			this.setState({
				hasAssignJobs: false,
				showProgress: false
			})
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
		}
	}
	/*
		async getAssignJobList() {
	
			if (this.state.user_id != null) {
	
				this.setState({
					showProgress: true,
					hasPickupJobs: false,
				})
				var url = "http://localhost:3000/vehicle";
				//var url = "http://www.metro.somee.com/api/UserAPI/ViewAssignedjobs?userID=" + this.state.user_id;
				//var url = "http://localhost:50292/api/UserAPI/ViewAssignedjobs?userID=7";
				console.log(url)
				//adb reverse tcp:3000 tcp:3000
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
	
						if (jobs.length > 0) {
							console.log('Actions - fetchJobs - received jobs: ', jobs)
							//Assign jobs list
							//var text = JSON.parse(jobs);
							this.setState({
								hasAssignJobs: true,
								showProgress: false,
								dataSource: this.state.dataSource.cloneWithRows(jobs)
	
							})
						} else {
							this.setState({
								hasAssignJobs: false,
								showProgress: false
							})
						}
	
					})
					.catch((error) => {
						console.warn('Actions - fetchJobs - recreived error: ', error)
						this.setState({
							hasAssignJobs: false,
							showProgress: false
						})
					})
			} else {
				console.log("User id cant find")
				this.setState({
					hasAssignJobs: false,
					showProgress: false
				})
			}
		}
	
		async getPickupJobList() {
	
	
			if (this.state.user_id != null) {
	
				this.setState({
					showProgress: true,
					hasPickupJobs: false,
				})
				var url = "http://localhost:3000/pickup";
				//var url = "http://www.metro.somee.com/api/UserAPI/ViewPickedUPjobs?userID=" + this.state.user_id;
				//var url = "http://localhost:50292/api/UserAPI/ViewAssignedjobs?userID=7";
				console.log(url)
				//adb reverse tcp:3000 tcp:3000
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
	
						if (jobs.length > 0) {
							console.log('pickup: ', jobs)
							console.log("jobs")
							//Assign jobs list
							//var text = JSON.parse(jobs);
							this.setState({
								hasPickupJobs: true,
								showProgress: false,
								dataSource2: this.state.dataSource2.cloneWithRows(jobs)
	
							})
						} else {
							this.setState({
								hasPickupJobs: false,
								showProgress: false,
							})
						}
	
					})
					.catch((error) => {
						console.warn('pickup error: ', error)
						this.setState({
							hasPickupJobs: false,
							showProgress: false
						})
					})
			} else {
				console.log("User id cant find")
				this.setState({
					hasPickupJobs: false,
					showProgress: false
				})
			}
		}
	*/


	goToFormPAge() {
		this.props.navigation.navigate('FormRoute')
	}



	render() {

		const { navigate } = this.props.navigation;

		var backbuttonPressCount = 0
		//handling back button
		BackHandler.addEventListener('hardwareBackPress', function () {
			backbuttonPressCount = backbuttonPressCount + 1;
			if (backbuttonPressCount == 2) {
				ToastAndroid.show("Please click BACK again to exit", ToastAndroid.SHORT);

			} else if (backbuttonPressCount >= 3) {
				BackHandler.exitApp();
			}
			return true;

		});



		return (


			<View style={styles.mainContainer}>

				<Text style={styles.titleText}> Assign Jobs </Text>

				<View style={styles.viewUnderLine} />
				{this.state.hasAssignJobs &&
					<View style={styles.assignJobsContainer}>


						<ListView
							style={styles.listContainer}
							dataSource={this.state.dataSource}
							renderRow={
								(rowData) => (
									<View style={styles.container}>
										<View style={styles.titleNPriceContainer}>
											<View style={styles.veh_nameContainer}>
												<Text style={styles.veh_name}>{rowData.Vehicle_Details} </Text>
											</View>
											<View style={styles.priceContainer}>
												<Text style={styles.price}>{rowData.Vehicle_Price}<Text > AUD</Text></Text>
											</View>
										</View>

										<View style={styles.addNTimeContainer}>
											<View style={styles.contactContainer}>
												<Text style={styles.address}>{rowData.Address}</Text>
												<Text style={styles.phone}>{rowData.phone}</Text>
											</View>
											<View style={styles.timeContainer}>
												<Text style={styles.time}>{rowData.Booking_Time}</Text>
											</View>
										</View>

										<View style={styles.cmtNButtonContainer}>
											<Text style={styles.cmt}>{rowData.Comments}</Text>
											<View style={styles.btnContainer}>
												<View style={styles.btn_single_container}>
													<TouchableHighlight
														onPress={() => navigate("FormRoute", {
															Vehicle_Details: rowData.Vehicle_Details,
															Phone: rowData.Phone,
															P_Addres: rowData.Address,
															R_Addres: rowData.Address,
															Price: rowData.Price_Quote,
															Paid_by: rowData.Paid_by
														})}
														style={styles.assbtnInvoice}

													>

														<Text style={styles.btnText}>Invoice</Text>

													</TouchableHighlight>
												</View>
												<TouchableHighlight
													onPress={() => this.props.navigation.navigate("FormManualRoute", {
														Vehicle_Details: rowData.Vehicle_Details,
														Price: rowData.Price_Quote,
													})}
													style={styles.assBtnAction}>

													<Text style={styles.btnText}>Action</Text>

												</TouchableHighlight>
											</View>
										</View>


									</View>
								)
							}
						/>





					</View>
				}
				{!this.state.hasAssignJobs &&
					<View style={styles.errContainer}>
						<Text style={styles.errText}>There are No Assigned Jobs for you Today.</Text>
					</View>
				}
				<Text style={styles.titleText}> Pickup Jobs </Text>

				<View style={styles.viewUnderLine} />

				{this.state.hasPickupJobs &&
					<View style={styles.pickupJobsContainer}>

						<ListView
							style={styles.listContainer}
							dataSource={this.state.dataSource2}
							renderRow={
								(rowData) => (
									<View style={styles.container}>
										<View style={styles.titleNPriceContainer}>
											<View style={styles.veh_nameContainer}>
												<Text style={styles.veh_name}>{rowData.Vehicle_Details} </Text>
											</View>
											<View style={styles.priceContainer}>
												<Text style={styles.price}>{rowData.Vehicle_Price}<Text > AUD</Text></Text>
											</View>
										</View>

										<View style={styles.addNTimeContainer}>
											<View style={styles.contactContainer}>
												<Text style={styles.address}>{rowData.Address}</Text>
												<Text style={styles.phone}>{rowData.phone}</Text>
											</View>
											<View style={styles.timeContainer}>
												<Text style={styles.time}>{rowData.Booking_Time}</Text>
											</View>
										</View>

										<View style={styles.cmtNButtonContainer}>
											<Text style={styles.cmt}>{rowData.Comments}</Text>
											<View style={styles.btnContainer}>
												<View style={styles.btn_single_container}>
													<TouchableHighlight
														onPress={() => ToastAndroid.show("Invoice Will apper..!", ToastAndroid.SHORT)}
														style={styles.assbtnInvoice}

													>

														<Text style={styles.btnText}>Invoice</Text>

													</TouchableHighlight>
												</View>

											</View>
										</View>


									</View>
								)
							}
						/>

					</View>
				}

				{!this.state.hasPickupJobs &&
					<View style={styles.errContainer}>
						<Text style={styles.errText}>You Haven't Pickup any jobs for Today.</Text>
					</View>
				}

				<Spinner visible={this.state.showProgress} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />


			</View>
		);
	}
}

const styles = StyleSheet.create({

	mainContainer: {
		flex: 1,
		backgroundColor: css.colors.background,
		paddingLeft: 10,
		paddingTop: 10
	},
	viewUnderLine: {
		height: 1,
		marginTop: 6,
		marginBottom: 6,
		marginRight: 10,
		backgroundColor: '#666F73'
	},
	assignJobsContainer: {

		backgroundColor: '#e0e0e0',
		borderColor: '#000',
		margin: 20,

	},
	pickupJobsContainer: {
		flex: 1,
		borderColor: '#000',
		margin: 20,
		backgroundColor: '#e0e0e0'

	},
	title: {
		marginLeft: 20,
		fontSize: 18,
	},
	listView: {

	},
	separator: {
		flex: 1,
		height: StyleSheet.hairLineWidth,
		backgroundColor: '#8E8E8E'
	},
	container: {
		flex: 1,
		padding: 10,
		borderBottomColor: '#fff',
		margin: 1,
		backgroundColor: '#fff'
	},
	titleNPriceContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	addNTimeContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	contactContainer: {
	},
	cmtNButtonContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	btnContainer: {
		marginTop: 30,
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end'
	},
	btn_single_container: {
		marginRight: 10
	},
	veh_nameContainer: {
		flex: 1,
		justifyContent: 'flex-end',

	},
	timeContainer: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	veh_name: {
		fontSize: font.fontMedium,
		textAlign: 'left'

	},
	price: {
		fontSize: font.fontMedium,
		textAlign: 'right'
	},
	address: {
		fontSize: font.fontMedium,
		textAlign: 'left'
	},
	phone: {
		fontSize: font.fontMedium,
		textAlign: 'left'
	},
	time: {
		fontSize: font.fontMedium,
		textAlign: 'right'
	},
	cmt: {
		fontSize: font.fontMedium,
		textAlign: 'left'
	},
	table: {
		margin: 5
	},
	head: {
		height: 40,
		backgroundColor: '#f1f8ff'
	},
	text: {
		textAlign: 'center'
	},
	assbtnInvoice: {
		backgroundColor: colors.homebtnInvoice,
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 10
	},
	assBtnAction: {
		backgroundColor: colors.homeBtnAction,
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 10

	},
	btnText: {
		color: colors.homeListBtn
	},
	errContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errText: {
		fontSize: font.fontMedium
	},
	titleText: {
		fontSize: font.fontLarge
	}

});

