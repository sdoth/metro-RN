import React from "react";
import { StyleSheet } from "react-native";

export const colors = {
  "secondary_blue": '#0686E4',
  "tertiary": '#ffffff',
  "background": '#fff',
  "background_dark": '#F0F0F0',
  "text_light": '#ffffff',
  "text_medium": '#464646',
  "text_dark": '#263238',
  "weather_text_color": '#464646',
  "transparent_white": '#FFFFFF00',
  "separator_background": '#E2E2E2',
  "small_btn_color": '#F0F0F0',
  "new_active_colour": '#E0e0e0',
}; 1

// workaround since on iOS NotoSans works, but not NotoSans-Regular
// on Android it works as expected (ie NotoSans-Regular)
export const getFont = () => {
  if (require('react-native').Platform.OS === 'ios') {
    return 'NotoSans';
  }
  else return 'NotoSans-Regular';
};

export const values = {
  "font_body": getFont(),
  "font_body_size": 18,
  "font_title_size": 16,
  "font_time_size": 12,
  "font_place_size": 20,
  "font_temp_size": 27,
  'border_radius': 2,
  "tiny_icon_size": 22,
  "small_icon_size": 40,
  "large_icon_size": 110,
  "drawer_status_bar_height": 320,
  "text_input_height": 50,
  "btn_height": 50,
  "btn_width": 160,
  "small_btn_height": 35,
  "small_btn_width": 100,
  "upload_btn_height": 45,
  "upload_btn_width": 200,
  "upload_button_text_size": 16,
  "form_main_container_margin": 25,
  "save_button_text_size": 20,
  "form_body_container_margin_top": 20,
  "form_body_title_margin_bottom": 5
};

export const addDegreesToEnd = (temp) => {
  return `${temp}${String.fromCharCode(176)}`
};

export const home_screen_list = StyleSheet.create(
  {
    container: {
      marginTop: 14,
      alignSelf: "stretch",
    },
    row: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: colors.tertiary,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    row_cell_timeplace: {
      flex: 1,
      flexDirection: 'column',
    },
    row_cell_temp: {
      color: colors.weather_text_color,
      paddingLeft: 16,
      flex: 0,
      fontSize: values.font_temp_size,
      fontFamily: values.font_body,
    },
    row_time: {
      color: colors.weather_text_color,
      textAlignVertical: 'bottom',
      includeFontPadding: false,
      flex: 0,
      fontSize: values.font_time_size,
      fontFamily: values.font_body,
    },
    row_place: {
      color: colors.weather_text_color,
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 0,
      fontSize: values.font_place_size,
      fontFamily: values.font_body,
    },
  });

export const home_screen = StyleSheet.create(
  {
    v_container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column', // main axis
      justifyContent: 'center', // main axis
      alignItems: 'center', // cross axis
      backgroundColor: colors.background_dark,
    },
  });

export const details_screen_2 = StyleSheet.create(
  {
    v_container: {
      flex: 1,
      flexDirection: 'column', // main axis
      alignItems: 'center', // cross axis
      backgroundColor: colors.tertiary,
      padding: 8,
    },
    day: {
      //backgroundColor: 'lavender',
      fontSize: 14,
      color: colors.weather_text_color,
    },
    temp: {
      fontSize: 24,
      color: colors.weather_text_color,
    },
    row: {
      alignItems: 'center',
      //backgroundColor: 'lightblue',
      marginLeft: 20,
      marginRight: 20
    },
    list: {
      //backgroundColor: 'lightyellow',
      paddingTop: 20,
    },
  }
);

export const details_screen_1 = StyleSheet.create(
  {
    v_container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column', // main axis
      justifyContent: 'center', // main axis
      alignItems: 'center', // cross axis
      backgroundColor: colors.tertiary,
    },
    separator: {
      alignSelf: 'stretch',
      backgroundColor: colors.separator_background,
      height: 1,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    place: {
      paddingTop: 20,
      paddingBottom: 20,
      color: colors.weather_text_color,
      fontFamily: values.font_body,
      fontSize: 35,
    },
    description: {
      color: colors.weather_text_color,
      fontFamily: values.font_body,
      fontSize: 14,
    },
    current_temp: {
      color: colors.weather_text_color,
      fontFamily: values.font_body,
      fontSize: 45,
    },
    list_container: {
      marginTop: 14,
      alignSelf: "stretch",
    },
    list_row: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 12
    },
    list_row_time: { flex: 1 },
    list_row_temp: { paddingLeft: 12 },
  }
);

export const settings_screen = StyleSheet.create(
  {
    v_container: {
      flex: 1,
      padding: 8,
      flexDirection: 'column', // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      backgroundColor: colors.tertiary,
    },
    text: {
      color: colors.weather_text_color,
      fontFamily: values.font_body,
      fontSize: 20,
    },
  }
);

// more info https://goo.gl/dqw4jF
export const header = {
  // background
  headerStyle: {
    backgroundColor: colors.secondary_blue,
  },
  // arrows
  headerTintColor: colors.text_light,
  // my own styles for titleAndIcon
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'center',
    paddingLeft: 8,
  },
  // my own styles for titleAndIcon
  text: {

    paddingLeft: 8,
    color: colors.text_light,
   // fontFamily: values.font_body,
    //fontSize: values.font_title_size,
  }

};

// more info https://goo.gl/eawcVg
export const tabs = {
  // text
  labelStyle: {
    fontFamily: values.font_body,
    fontSize: values.font_body_size,
  },
  activeTintColor: colors.secondary_blue, // text color active tab
  inactiveTintColor: colors.text_medium, // text color inactive tab
  indicatorStyle: { backgroundColor: colors.secondary_blue }, // active tab highlight top
  style: {
    backgroundColor: colors.tertiary, // background color of tabs
    borderTopColor: colors.tertiary // active tab highlight bottom
  }
};

// styling for for DrawerView.Items in contentOptions
// more info - https://goo.gl/d74VUZ
export const drawer = {
  activeBackgroundColor: colors.new_active_colour,
  inactiveBackgroundColor: colors.background,
  inactiveTintColor: colors.text_dark, // text color for inactive drawer items
  activeTintColor: colors.text_dark, // text color for active drawer items
  // style object for text style
  labelStyle: {
   // fontFamily: values.font_body,
    fontSize: 16,
  },
  // style object for the content section
  style: {
    backgroundColor: colors.background,
  },
};

export const drawer_status_view = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    alignItems: 'center'
  },
  body_container: {
    marginTop:20,
    padding: 20,
    alignItems: 'center',justifyContent:'center'
  },
  header_font: {
    fontSize: 26,
    color: '#000',
    alignItems: 'flex-start'
  },
  body_text: {
    fontSize: 16,
    color: '#000',
    alignItems: 'flex-start'
  }
});

export const form = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',

  },
  body_contianer_text:{
    marginBottom:20
  },
  title_container:{
    flex:1,
    
  },
  btnContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end',
		paddingBottom: 10,
		paddingTop: 10
	},
	btn_single_container: {
		marginRight: 10
	},
  title:{
    fontSize: 24
  },
  line_container:{
   height:1,
   backgroundColor:"#ced0ce",
   marginTop:10,
   
  },

  form_container: {
    margin: values.form_main_container_margin,
    flex: -1,
  },
  button_container: {
    flex: -1,
    alignItems: 'flex-end',
    margin: values.form_main_container_margin,
  },
  button_small_container: {
    justifyContent: 'flex-start'
  },
  body_contianer_paidby: {
    flex: -1,
  },
  body_contianer_amount: {
    flex: -1,
    marginTop: values.form_body_container_margin_top
  },
  body_contianer_type: {
    flex: -1,
  },
  body_contianer_reason: {
    flex: -1,
    marginTop: values.form_body_container_margin_top

  },
  body_contianer_upload: {
    flex: -1,
    marginTop: values.form_body_container_margin_top

  },
  payment_list_view_container: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: values.form_main_container_margin
  },
  customer_view_container: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: values.form_main_container_margin
  },
  body_text: {
    fontSize: values.font_body_size,
    marginBottom: values.form_body_title_margin_bottom,

  },
  text_input: {
    height: values.text_input_height,
    fontSize: values.font_body_size,
    borderWidth: 1,
    borderColor: 'gray'
  },
  button: {
    height: values.btn_height,
    width: values.btn_width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary_blue
  },
  button_small: {
    height: values.small_btn_height,
    width: values.small_btn_width,
    alignItems: 'center',
    backgroundColor: colors.small_btn_color
  },
  save_button_text: {
    fontSize: values.save_button_text_size,
    color: colors.background
  },
  upload_btn_text_container: {
    flexDirection: 'row',
    backgroundColor: colors.secondary_blue,
    height: values.upload_btn_height,
    width: values.upload_btn_width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  upload_btn_text: {
    fontSize: values.upload_button_text_size,
    color: colors.background
  },
  container_upload_btn: {

  },

});

//style for login screen

export const login_Styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:colors.secondary_blue,
     justifyContent:'center',
    alignItems:'center'
  },
  main_body_container:{
    backgroundColor:colors.secondary_blue,
    padding:50,
    justifyContent:'flex-start',
   
  },

  title: {

    fontSize: 40,
    color:"#fff",
    textAlign: 'center',
    fontFamily: 'BebasNeue'
  },
  titleContainer: {
    flex: 1
  },
  form: {
    flex: 2.5,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
  
    marginTop: 40,
    

  },
  inputContainer: {

    height: 20
  },
  emailContainer: {
    flexDirection: 'column'
  },
  logoContainer: {
   marginBottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:60

  },
  button_text_container: {
    flexDirection: 'row',
justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'BebasNeue'
  },
  input: {
    height: 40,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
  },
  passwordContainer: {
    marginTop: 40
  },
  password: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'BebasNeue'
  },
  loginButton: {
    height: 50,
    backgroundColor: '#4484ce',
    width: 200,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems:'center',
    paddingLeft: 30,
    paddingRight: 30,
    borderColor:'#ffffff',
    borderWidth:1
  },
  logginButtonText: {
    marginTop: 1,
    marginRight:30,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'BebasNeue'
  },
  image:{
    justifyContent: 'center',
    alignItems: 'center',
    height:100,
    width:120,
    
    
  },

});


