import React from 'react';
import { Container, View, Text } from 'native-base';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

class CalendarView extends React.Component {
  state = {
    scheduleData: {
      '2018-02-12': { dots: [{ key: 'hoho', color: 'red', selectedColor: 'red' }, { key: 'notads', color: 'blue' }] },
    },
  };

  componentDidMount() {
    this.changeSelectedDay(moment().format('YYYY-MM-DD'));
  }

  changeSelectedDay = (date) => {
    this.setState({
      selected: date.dateString,
    });
    this.makeCalendarData(this.state.selected);
    console.log(this.state);
  }

  makeCalendarData = (day) => {
    this.setState({
      calData: {
        ...this.state.scheduleData,
        [day]: Object.assign({}, this.state.scheduleData[day], { selected: true }),
      },
    });
  }

  render() {
    return (
      <Container style={{ display: 'flex' }}>
        <View style={{ flex: 1.8 }}>
          <Calendar
            displayLodingIndicator
            markingType={'multi-dot'}
            onDayPress={(day) => {
              this.changeSelectedDay(day);
            }}
            markedDates={this.state.calData}
          />
        </View>
        {/* 하단 카테고리 목록 */}
        <View style={{ flex: 1 }}>
          <Text>텍스트 출력 확인 </Text>
        </View>
      </Container>
    );
  }
}
export default CalendarView;
