import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,AlertIOS
} from 'react-native';
import ScrollPicker from './MyScrollView'
var moment = require('moment');

export default class DateTime extends Component {

  constructor(props){
      super(props);

      var date = new Date(this.props.initDate.getTime()+(60000 * this.props.chillOff));
      if (date.getMinutes() > 30) {
        var hour = date.getHours()
        if (hour==23) {
          date.setTime(date.getTime() + (1*60*60*1000));
        }else{
          date.setHours(hour+1)
        }
        date.setMinutes(0)
      }else{
        date.setMinutes(30)
      }

      if (date < this.props.startDate) {
        date.setTime(this.props.startDate.getTime());
      }

      var object = this.getDayHourMinAmPm(new Date(date.getTime()))

      var isFixed = false
      if (this.props.fixedDate != null) {
        isFixed = true

        date.setTime(this.props.fixedDate.getTime());
      }


      this.state = {
          initDate:new Date(date.getTime()),
          defaultHour:this.props.defaultHour,
          chillOff:this.props.chillOff,
          fixedDate:this.props.fixedDate,
          startDate:this.props.startDate,
          endDate:this.props.endDate,
          onValueChange:this.props.onValueChange,
          firstDayText:this.props.firstDayText,
          dayIndex:0,
          hourIndex:0,
          minIndex:0,
          AMPMIndex:0,
          dayValue:object.day,
          hourValue:object.hour,
          minutesValue:object.min,
          ampmValue:object.AmPm,
          scrollingEnabled:true,
          fixedDate:isFixed
      };
  }

  static propTypes = {
    initDate:React.PropTypes.Date,
    defaultHour:React.PropTypes.number,
    chillOff:React.PropTypes.number,
    fixedDate:React.PropTypes.Date,
    startDate:React.PropTypes.Date,
    endDate:React.PropTypes.Date,
    onValueChange:React.PropTypes.func,
  }

  componentDidMount=()=>{
    if (this.state.defaultHour>0) {
      setTimeout(() => {
        var defaultDate = new Date(this.state.initDate.getTime()+(3600000 * this.state.defaultHour));
        if (this.state.startDate != null && this.state.startDate.getTime() === this.state.initDate.getTime()) {
          this.gotoDate(defaultDate)
        }else{
          this.gotoDate(defaultDate)
        }
      }, 0)

    }else{
      setTimeout(() => {
        var defaultDate = new Date(this.state.initDate.getTime());
        if (this.state.startDate != null && this.state.startDate.getTime() == this.state.initDate.getTime()) {
          this.gotoDate(defaultDate)
        }else{
          this.gotoDate(defaultDate)
        }

      }, 0)
    }
  }

  gotoDate=(date)=>{
    this.setState({scrollingEnabled:true})

    var defaultDate = new Date(date.getTime());
    var defaultObject = this.getDayHourMinAmPm(defaultDate)
    var dayIndex = this.getIndexFromArray(defaultObject.day,this.getDaysArray())
    var hourIndex = this.getIndexFromArray(defaultObject.hour,this.getHoursArray())
    var minutesIndex = this.getIndexFromArray(defaultObject.min,this.getMinutesArray())
    var ampmIndex = this.getIndexFromArray(defaultObject.AmPm,this.getAmPmArray())

    setTimeout(() => {
      this.refs.dayScroll.scrollToIndex(dayIndex)
      this.refs.hourScroll.scrollToIndex(hourIndex)
      this.refs.minsScroll.scrollToIndex(minutesIndex)
      this.refs.ampmScroll.scrollToIndex(ampmIndex)
    }, 0)

    setTimeout(() => {
      this.setState({scrollingEnabled:false})
    }, 2000)

  }

  getDayHourMinAmPm=(date)=>{
    var m = moment(date)

    var day = m.format("ddd, MMM DD YYYY");
    var minutes = m.format("mm");
    var hourString = m.format("h");
    var hourInt = parseInt(hourString)

    var hour
    if (hourInt<10) {
      hour = '0'+hourInt
    }else{
      hour = ''+hourInt
    }
    var ampm = 'AM'
    if (date.getHours()>11 ) {
      ampm = 'PM'
    }
    return {'day':day,'hour':hour,'min':minutes,'AmPm':ampm}
  }


  getIndexFromArray(item,array){
    for (var i = 0; i < array.length; i++) {
      if (array[i] == item) {
        return i
      }
    }
    return 0;
  }

  getDaysArray=()=>{
    var daysArray = []
    for (var i = 0; i < 90; i++) {

      var temp = new Date(this.state.initDate.getTime())
      var m = moment(temp)
      if (i==0) {
        var singleEntry = this.state.firstDayText
        if (this.state.firstDayText == 'Date') {
          singleEntry = m.add(i, 'days').format("ddd, MMM DD YYYY");
        }
      }else{
        var singleEntry = m.add(i, 'days').format("ddd, MMM DD YYYY");
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

    var start = 0
    var end = 11

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
    return ['00','30']
  }

  getAmPmArray=()=>{
    return ['AM','PM']
  }

  isBiggerThanMax(date,max){
    if (!this.state.scrollingEnabled) {
      return date > max
    }
    return false
  }

  isLessThanStart(date,max){
    if (!this.state.scrollingEnabled) {
      return date < max
    }
    return false
  }

  isLessThanMinimum(date){
    if (!this.state.scrollingEnabled) {
      return date < this.state.initDate
    }
    return false
  }

  selectedDate=()=>{
    var dayValue = this.state.dayValue
    var dateString = dayValue+' '+this.state.hourValue+':'+this.state.minutesValue+':00 '+this.state.ampmValue
    var momentObj = moment(dateString, 'ddd, MMM DD YYYY hh:mm A').toDate()

    if (this.isLessThanMinimum(momentObj)) {
      var defaultDate = new Date(this.state.initDate.getTime());
      this.gotoDate(defaultDate)
    }

    if (this.state.startDate != null && this.state.endDate!= null) {
      var dateString2 = dayValue+' '+this.state.endDate.getHours()+':'+this.state.endDate.getMinutes()+':00 '
      var momentObj2 = moment(dateString2, 'ddd, MMM DD YYYY h:mm A').toDate()

      if (this.isBiggerThanMax(momentObj,momentObj2)) {
        this.gotoDate(momentObj2)
      }

      var dateString3 = dayValue+' '+this.state.startDate.getHours()+':'+this.state.startDate.getMinutes()+':00 '
      var momentObj3 = moment(dateString3, 'ddd, MMM DD YYYY h:mm A').toDate()

      if (this.isLessThanStart(momentObj,momentObj3)) {
        this.gotoDate(momentObj3)
      }
    }

    setTimeout(() => {
      this.state.onValueChange(momentObj)
    }, 300)
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
                  wrapperWidth={160}
                  onValueChange={(data, selectedIndex) => {
                    setTimeout(() => {
                      this.setState({dayValue:data})
                    }, 0)

                    setTimeout(() => {
                      this.selectedDate()
                    }, 500)
                   }}
              />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'hourScroll'}
                  dataSource={this.getHoursArray(this.state.ampmValue)}
                  selectedIndex={this.state.hourIndex}
                  highlightColor={'black'}
                  scrollEnabled={!this.state.fixedDate}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {
                    setTimeout(() => {
                      this.setState({hourValue:data,hourIndex:selectedIndex})
                    }, 0)

                    setTimeout(() => {
                      this.selectedDate()
                    }, 500)
                  }}
              />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'minsScroll'}
                  dataSource={this.getMinutesArray()}
                  selectedIndex={this.state.minIndex}
                  highlightColor={'black'}
                  scrollEnabled={!this.state.fixedDate}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {
                    setTimeout(() => {
                      this.setState({minutesValue:data,minIndex:selectedIndex})
                    }, 0)

                    setTimeout(() => {
                      this.selectedDate()
                    }, 500)
                  }}
                />
            </View>

            <View style={{flex:0.3}}>
              <ScrollPicker
                  ref = {'ampmScroll'}
                  dataSource={this.getAmPmArray()}
                  selectedIndex={this.state.AMPMIndex}
                  highlightColor={'black'}
                  scrollEnabled={!this.state.fixedDate}
                  itemHeight={50}
                  wrapperWidth={50}
                  onValueChange={(data, selectedIndex) => {
                    setTimeout(() => {
                      this.setState({ampmValue:data})
                      if (this.state.startDate != null && this.state.endDate != null && !this.state.scrollingEnabled) {
                        this.refs.hourScroll.scrollToIndex(this.state.hourIndex)
                        this.refs.minsScroll.scrollToIndex(this.state.minIndex)
                      }
                    }, 0)

                    setTimeout(() => {
                      this.selectedDate()
                    }, 400)
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
