import React, { Component } from 'react';

import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView
} from 'react-native';

export default ExpencePaymentListRow = (props) => {

    
          let expenceTypeOrReson, driverOrPaidBy;
          let valueExpenceTypeOrReson, valueDriverOrPaidBy;
         // let viewPaidBy = true;
  
          if (props.type == "payment") {
              expenceTypeOrReson = "Reason";
              driverOrPaidBy = "Paid By";
              valueExpenceTypeOrReson = props.reason;
              valueDriverOrPaidBy = props.Paid_By;
  
          }else if(props.type == "expence"){
              expenceTypeOrReson = "Type";
              driverOrPaidBy = "Driver";
              valueExpenceTypeOrReson = props.Name;
              valueDriverOrPaidBy = props.Expense_By;
          }
  
    //console.log("pay "+this.props.Name)
    return (


        <View>
            <ListView
                style={styles.listContainer}
                dataSource={props.dataSource}
                renderRow={

                    (rowData) => (

                        <View style={styles.container}>
                            <View style={styles.resonContainer}>
                                <Text style={styles.h1}>{props.type == "expence" ? rowData.Name : rowData.Reason}</Text>
                                <Text style={styles.h1}>{rowData.Amount} <Text style={styles.h1}> AUD</Text></Text>
                            </View>

                            <View style={styles.datePaidContainer}>
                                <Text style={styles.h2}>{props.type == "expence" ? rowData.Date_Expense : rowData.Payment_Date}</Text>
                                <Text style={styles.h2}>Paid By : <Text> {props.type == "expence" ? rowData.Expense_By : rowData.Paid_By}</Text></Text>
                            </View>
                        </View>
                    )
                }
            />
        </View>




    );


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,




    },
    datePaidContainer: {
        flex: 1,
        justifyContent: 'flex-start'
        , padding: 8,
    },
    resonContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        padding: 8,

    },
    h1: {
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center', fontFamily: 'Ubuntu-R',

    },
    h2: {
        marginTop:5,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center', fontFamily: 'Ubuntu-R',
    }


});