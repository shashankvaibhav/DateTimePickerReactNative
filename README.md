# DateTimePickerReactNative
Date time picker for React native

<DateTimePicker initDate={new Date()} firstDayText={'Date'} defaultHour={0} chillOff={0} fixedDate={new Date(2017,8,8,12,0)} startDate={null} endDate={null} onValueChange={this.onDateChangePick}/>


For Normal Case -

initDate - CurrentDate
chillOff - Chill off time between current date and the from which picker will start taking dates.
defaultHour - Default value of after initDate + chillOff + defaultHour
fixedDate - null
startDate = null
endDate = null


For Fixed Date 

initDate - CurrentDate
chillOff - 0
defaultHour - 0
fixedDate - Date object with current day and fixed hour value and minute value
startDate = null
endDate = null

For Start Date and End Sate

initDate - CurrentDate
chillOff - 0
defaultHour - 0
fixedDate - null
startDate = Date object with current day and start hour value and minute value
endDate = Date object with current day and end hour value and minute value

