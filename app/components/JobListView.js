import React, { Component } from 'react'
import {
    View,
    ListView,
    Text,
    StyleSheet, Button,TouchableHighlight
} from 'react-native'

export default JobListView = (props) => {
    return (
        <View>
            <ListView
                style={styles.listContainer}
                dataSource={props.dataSource}
                renderRow={
                    (rowData) => (
                        <View style={styles.container}>
                            <View style={styles.titleNPriceContainer}>
                                <View style={styles.veh_nameContainer}>
                                    <Text style={styles.veh_name}>{rowData.Vehicle_Details} </Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>{rowData.Vehicle_Price}<Text style={{fontStyle:'bold'}}> AUD</Text></Text>
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
                                        style={{
                                            fontFamily:'Ubuntu-L',
                                             backgroundColor:'#666F73',
                                             
                                             paddingHorizontal:40,
                                             paddingVertical:10
                                             }}
                                          
                                        >

                                            <Text style={{color:'#fff'}}>Invoice</Text>

                                        </TouchableHighlight>
                                    </View>
                                    <TouchableHighlight
                                    style={{
                                        fontFamily:'Ubuntu-L',
                                     backgroundColor:'#6053CE',
                                     paddingHorizontal:40,
                                     paddingVertical:10
                                     
                                     }}
                                      
                                    >
                                    
                                         <Text style={{color:'#fff'}}>Action</Text>

                                    </TouchableHighlight>
                                </View>
                            </View>


                        </View>
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderBottomColor: '#fff'

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
        marginTop:30,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    btn_single_container: {
        marginRight: 10
    },
    veh_nameContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    timeContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    veh_name: {
        fontFamily:'Ubuntu-R',
        fontSize: 22,
        textAlign: 'left'

    },
    price: {
       fontFamily:'Ubuntu-R',
        fontSize: 22,
        textAlign: 'right'
    },
    address: {
        fontFamily:'Ubuntu-R',
        fontSize: 18,
        textAlign: 'left'
    },
    phone: {
        fontFamily:'Ubuntu-R',
        fontSize: 18,
        textAlign: 'left'
    },
    time: {
       fontFamily:'Ubuntu-R',
        fontSize: 18,
        textAlign: 'right'
    },
    cmt: {
       fontFamily:'Ubuntu-R',
        fontSize: 18,
        textAlign: 'left'
    }

})