import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DateTimePicker from './DateTimePicker'


export default class DateTime extends Component {

  onDateChangePick=(date)=>{
    console.log(date)
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <DateTimePicker initDate={new Date()} firstDayText={'Date'} defaultHour={0} chillOff={0} fixedDate={new Date(2017,8,8,12,0)} startDate={null} endDate={null} onValueChange={this.onDateChangePick}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('DateTime', () => DateTime);
