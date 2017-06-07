import React, { Component } from 'react';
import {
    Text,
    Button,
    Platform,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,NetInfo,
    Image, AsyncStorage, ScrollView, ToastAndroid
} from 'react-native';
import Home from './_home'
import { colors, font } from '../utill/_styleConstants'
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { constUrls } from '../lib/_constantsUrls';
import Api from '../lib/_serviceCall';


export default class Login extends Component {

    //navigation 
    _navigation;

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            password: '',
            showProgress: false,
            showError: false,
            hasLogged: false,
            _loginDisabled: false,
            _errorMessageToShow: null
        };
    }

    componentDidMount() {

        //check user logged in
        this.getFromStoreData();
        
    }

    render() {
        _navigation = this.props.navigation;

        return (
            // <Image source={require('../img/background.jpg')}>
            /*    <Image
                                style={styles.logo}
                                source={require('../img/logo6.png')}
                            />*/
            <View style={styles.container}>


                <View style={styles.loginFormContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={{ textAlign: 'center', fontSize: 28, color: '#fff' }}>Welcome</Text>
                        <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff' }}>Metro Manegment</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff' }}>Please Enter Login details to continue</Text>
                    </View>


                    <View style={styles.usernameContainer}>
                        <View style={styles.usernameTextCover}>
                            <Icon name="ios-person-outline" size={20} color="#fff" />
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='#0686E4'
                                placeholder='Username'
                                placeholderTextColor={colors.placeholder}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                value={this.state.user_name}
                                onChangeText={user_name => this.setState({ user_name })}
                                onSubmitEditing={(event) => this.refs.password.focus()}
                            />
                        </View>
                        <View style={styles.line}></View>
                    </View>

                    <View style={styles.passContainer}>
                        <View style={styles.passTextCover}>
                            <Icon name="ios-lock-outline" size={20} color="#fff" />
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid='#0686E4'
                                placeholder='Password'
                                placeholderTextColor={colors.placeholder}
                                ref={'password'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                returnKeyType="go"
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}

                            />
                        </View>
                        <View style={styles.line}></View>
                    </View>



                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            onPress={this.onLoginPressed.bind(this)}
                            style={styles.loginButton}>
                            <View style={styles.buttonTextContainer}>
                                <Text style={styles.logginButtonText}>Login</Text>
                                <Icon name="ios-arrow-dropright-outline" size={20} color="#fff" />
                            </View>
                        </TouchableOpacity>

                    </View>

                    {this.state.showError &&
                        <View style={styles.errContainer}>
                            <Text style={{
                                fontSize: 16,
                                color: 'red',
                                textAlign: 'center'
                            }}>{this.state._errorMessageToShow}</Text>
                        </View>
                    }




                </View>



                <View style={{ flex: 0.3 }}>
                    <Spinner visible={this.state.showProgress} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                </View>


            </View>

            //  </Image>
        );
    }



    async getFromStoreData() {
        var username_, userid_;

        await AsyncStorage.getItem('login_details')
            .then(req => JSON.parse(req))
            .then(json => {
                //this.getAssignJobList(json.user_id)
                console.log('user_has_logged ' + json.user_has_logged)
                if (json.user_has_logged) {
                    console.log("login through saving data")
                    this.props.navigation.navigate('drawer_route')
                }
            }


            )
            .catch(error => console.log('error!'));

    }

    componentWillUnmount() {
    }



    //store
    async storeData(user_details) {
        try {
            await AsyncStorage.setItem('login_details', JSON.stringify(user_details));

        } catch (error) {
            console.log('storing error - ' + error)
        }
    }
    //submit form

    async onLoginPressed() {

        const { user_name, password, hasLogged, _loginDisabled } = this.state;

        if (user_name.length <= 0 && password.length <= 0) {
            console.log("Please enter user details")

            this.setState({
                showError: true,
                _errorMessageToShow: "Please enter Username and Password."
            })

        } else if (!user_name) {
            this.setState({
                showError: true,
                _errorMessageToShow: "Please enter Username."
            })
        } else if (!password) {
            this.setState({
                showError: true,
                _errorMessageToShow: "Please enter Password."
            })
        }
        else {


           

/*

            var sericeType = "UserAuthentication?userName=" + this.state.user_name + "&passsword=" + this.state.password;
            Api.get(constUrls._userLogin + sericeType)
                .then(user => {

                    user.map(function(item){
                    if ((item.User_Id) > 0) {
                        console.log('login: ', user)

                        this.setState({
                            showProgress: false,
                            showError: false,
                            hasLogged: true
                        })

                        let login_details = {
                            username: item.User_Name,
                            user_id: item.User_Id,
                            user_has_logged: hasLogged
                        }
                        this.props.navigation.navigate('drawer_route')
                        this.storeData(login_details);


                    } else {
                        console.log('Actions - fetchJobs - received jobs: ', user)

                        this.setState({
                            showProgress: false,
                            showError: true,
                            hasLogged: false,
                            _errorMessageToShow: item.ErrorMessage
                        })
                    }
                    })

                })
                .catch(err => {

                })

                */

                NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected) {
				//is online get data from online otherwise get from db
				 this.setState({
                showProgress: true,
                showError: false
            })
			


            var url = "http://www.metro.somee.com/api/UserAPI/UserAuthentication?userName=" + this.state.user_name + "&passsword=" + this.state.password;
            // var url = "http://localhost:50292/api/UserAPI/UserAuthentication?userName=rizwan&passsword=1234";
            console.log(url)
            //adb reverse tcp:50292 tcp:50292
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
                .then((user) => {
                    if ((user.User_Id) > 0) {
                        console.log('login: ', user)

                        this.setState({
                            showProgress: false,
                            showError: false,
                            hasLogged: true
                        })

                        let login_details = {
                            username: user.User_Name,
                            user_id: user.User_Id,
                            user_has_logged: this.state.hasLogged
                        }
                        this.props.navigation.navigate('drawer_route')
                        this.storeData(login_details);


                    } else {
                        console.log('Actions - fetchJobs - received jobs: ', user)

                        this.setState({
                            showProgress: false,
                            showError: true,
                            hasLogged: false,
                            _errorMessageToShow: user.ErrorMessage
                        })
                    }

                })
                .catch((error) => {
                    console.warn('login error: ', error)
                    ToastAndroid.show("Our Servers are busy.Please try again later.", ToastAndroid.SHORT)

                    this.setState({
                        showProgress: false,

                    })
                })

                } else {
				ToastAndroid.show('Please Check your Internet Connection', ToastAndroid.LONG)
				
			};
		});
        }


    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginFormContainer: {
        flex: 1,
        width: 200,
        marginTop: 100
    },
    logoContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 100,
    },
    usernameContainer: {
        marginTop: 25
    },
    usernameTextCover: {
        flex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 1
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        height: 43,
        fontSize: 16,
        color: '#fff'
    },
    line: {
        backgroundColor: colors.loginDeviderColor,
        height: 1
    },
    passContainer: {
        marginTop: 30
    },
    passTextCover: {
        flex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 1
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'center',
        marginTop: 40,
    },
    loginButton: {
        height: 50,
        backgroundColor: colors.buttonLogin,
        width: 200,
        marginBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        borderColor: colors.buttonLoginBorder,
        borderWidth: 1
    },
    errContainer: {
        alignItems: 'center'
    },
    buttonTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logginButtonText: {
        marginTop: 1,
        marginRight: 30,
        fontSize: font.fontButton,
        color: '#fff',
        fontFamily: 'BebasNeue'
    },
})
