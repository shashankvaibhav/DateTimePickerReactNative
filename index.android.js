import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ScrollPicker from './MyScrollView'
var moment = require('moment');

export default class DateTime extends Component {

  static propTypes = {
    initDate:React.PropTypes.Date,
    defaultHour:React.PropTypes.number,
    chillOff:React.PropTypes.number,
    fixedDate:React.PropTypes.Date,
    pickupDate:React.PropTypes.Date,
    dropDate:React.PropTypes.Date,
    onValueChange:React.PropTypes.func,
  }

  constructor(props){
      super(props);

      // this.state = {
      //     initDate:this.props.initDate,
      //     defaultHour:this.props.defaultHour,
      //     chillOff:this.props.chillOff,
      //     fixedDate:this.props.fixedDate,
      //     pickupDate:this.props.pickupDate,
      //     dropDate:this.props.dropDate
      // };

      var date = new Date(new Date().getTime()+(60000 * 60));
      var ampm = ''
      if (date.getHours()>11) {
        ampm = 'PM'
      }else{
        ampm = 'AM'
      }

      var minutes = ''
      var hour
      if (date.getMinutes()>=30) {
        minutes = '00'
        hour = date.getHours()+1
        if (hour == 24) {
          hour = 0
        }
      }else{
        minutes = '30'
        hour = date.getHours()
      }

      if (hour > 11 && hour <= 23) {
        hour = hour-12
      }

      if (hour == 0) {
        hour = '12'
      }else{
        if (hour<10) {
          hour = '0'+hour+''
        }else{
          hour = hour+''
        }
      }


      this.state = {
          initDate: new Date(),
          defaultHour: 12,
          chillOff: 60,
          fixedDate: null,
          startDate: null,
          endDate: null,
          isAMSelected:true,
          dayIndex:0,
          hourIndex:0,
          minIndex:0,
          AMPMIndex:0,
          dayValue:'Today',
          hourValue:hour,
          minutesValue:minutes,
          ampmValue:ampm,
          initAMPM:ampm
      };


      dayValue = 'Today'
      hourValue = hour
      minutesValue = minutes
      ampmValue = ampm
  }

  getDaysArray=()=>{
    var date = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff));
    var daysArray = []
    for (var i = 0; i < 200; i++) {

      var temp = new Date(date.getTime())
      var m = moment(temp)

      if (i==0) {
        var singleEntry = 'Today'
      }else{
        var singleEntry = m.add(i, 'days').format("ddd, MMM DD");
      }
      daysArray.push(singleEntry)
    }
    return daysArray
  }

  getHoursArray=(ampmValue)=>{

    var start = 0
    var end = 11

    if (ampmValue === 'AM') {
      if (this.state.startDate != null && this.state.endDate != null) {
        var startDate = new Date(this.state.startDate.getTime())
        var endDate = new Date(this.state.endDate.getTime())

        var startHour = startDate.getHours()
        var endHour = endDate.getHours()

        if (startHour <= 11) {
          start = startHour
        }

        if (endHour<= 11) {
          end = endHour
        }
      }
    }else{
      if (this.state.startDate != null && this.state.endDate!= null) {
        let startDate = new Date(this.state.startDate.getTime())
        let endDate = new Date(this.state.endDate.getTime())

        let startHour = startDate.getHours()
        let endHour = endDate.getHours()

        if (startHour > 11 && startHour <= 23) {
          start = startHour-12
        }

        if (endHour > 11 && endHour <= 23) {
          end = endHour-12
        }
      }
    }
    var init = 0
    if (this.state.dayValue == 'Today' && ampmValue === this.state.initAMPM) {
      var initHour = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff)).getHours()
      if (initHour > 11 && initHour <= 23) {
        init = initHour-12
      }else{
        init = initHour
      }

      var initMin = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff)).getMinutes();
      if (initMin >= 30) {
        init = init +1
      }

      if (init >= start) {
        start = init;
      }
    }

    var array = []
    for (var i = start; i <= end; i++) {
      var single
      if (i >= 10) {
        single = ''+i
      }else if(i == 0){
        single = '12'
      }else{
        single = '0'+i
      }

      array.push(single)
    }
    return array

  }


  getMinutesArray=()=>{
    if (this.state.startDate != null && this.state.endDate!= null) {
      let startDate = new Date(this.state.startDate.getTime())
      let endDate = new Date(this.state.endDate.getTime())

      let startHour = startDate.getMinutes()
      let endHour = endDate.getMinutes()

    }else{
      var date = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff))
      var hour = ''
      if (date.getMinutes()>=30) {
        hour = date.getHours()+1
        if (hour == 24) {
          hour = 0
        }
      }else{
        hour = date.getHours()
      }

      if (hour > 11 && hour <= 23) {
        hour = hour-12
      }

      if (hour == 0) {
        hour = '12'
      }else{
        if (hour<10) {
          hour = '0'+hour+''
        }else{
          hour = hour+''
        }
      }

      if (this.state.dayValue == 'Today' && hour == this.state.hourValue) {
        var initMin = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff)).getMinutes();
        if (initMin >= 30) {
          return ['00','30']
        }else{
          return ['30']
        }
      }

      return ['00','30']
    }
  }

  selectedDate=()=>{
    var dayValue = this.state.dayValue
    if (dayValue == 'Today') {
      var date = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff))
      var m = moment(date)
      var value = m.add(0, 'days').format("ddd, MMM DD");
      dayValue = value
    }

    setTimeout(() => {
      console.log(dayValue+' '+this.hourValue+':'+this.minutesValue+':00 '+this.ampmValue)
    }, 500)
  }

  getAmPmArray=()=>{
    if (this.state.startDate != null && this.state.endDate!= null) {
      let startDate = new Date(this.state.startDate.getTime())
      let endDate = new Date(this.state.endDate.getTime())

      let startHour = startDate.getMinutes()
      let endHour = endDate.getMinutes()

      return ['AM','PM']

    }else{
      if (this.state.dayValue == 'Today') {
        var inithour = new Date(this.state.initDate.getTime()+(60000 * this.state.chillOff)).getHours();
        if (inithour >= 11) {
          return ['PM']
        }else{
          return ['AM','PM']
        }
      }

      return ['AM','PM']
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:275,flexDirection:'row',padding:16, borderColor:'#f7f7f7'}}>
            <View style={{flex:1}}>
              <ScrollPicker
                  ref = {'dayScroll'}
                  dataSource={this.getDaysArray()}
                  selectedIndex={this.state.dayIndex}
                  highlightColor={'black'}
                  itemHeight={50}
                  wrapperWidth={120}
                  onValueChange={(data, selectedIndex) => {

                    setTimeout(() => {
                      this.refs.hourScroll.scrollToIndex(0)
                      this.refs.minsScroll.scrollToIndex(0)
                      this.refs.ampmScroll.scrollToIndex(0)
                    }, 0)

                    setTimeout(() => {
                      this.setState({dayValue:data})
                      this.dayValue = data
                      this.selectedDate()
                    }, 100)
                  }}
              />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'hourScroll'}
                  dataSource={this.getHoursArray(this.state.ampmValue)}
                  selectedIndex={this.state.hourIndex}
                  highlightColor={'black'}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {
                    setTimeout(() => {
                      this.refs.minsScroll.scrollToIndex(0)
                    }, 0)

                    setTimeout(() => {
                      this.setState({hourValue:data})
                      this.hourValue = data
                      this.selectedDate()
                    }, 100)
                  }}
              />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'minsScroll'}
                  dataSource={this.getMinutesArray()}
                  selectedIndex={this.state.minIndex}
                  highlightColor={'black'}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {

                    setTimeout(() => {
                      this.setState({minutesValue:data})
                      this.minutesValue = data
                      this.selectedDate()
                    }, 100)
                  }}
                />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'ampmScroll'}
                  dataSource={this.getAmPmArray()}
                  selectedIndex={this.state.AMPMIndex}
                  highlightColor={'black'}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {

                    setTimeout(() => {
                      this.refs.hourScroll.scrollToIndex(0)
                      this.refs.minsScroll.scrollToIndex(0)
                    }, 0)

                    setTimeout(() => {
                      this.setState({ampmValue:data})
                      this.ampmValue = data
                      this.selectedDate()
                    }, 100)
                  }}
                />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DateTime', () => DateTime);
