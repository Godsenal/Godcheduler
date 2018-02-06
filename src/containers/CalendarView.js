import React from 'react';
import { Container, View, Text } from 'native-base';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

class CalendarView extends React.Component {
  state = {
    today: '',
    dateData: {
    },
    selectedDate: {},
  };
  componentWillMount() {
    this.changeSelectedDay(moment().format('YYYY-MM-DD'));
    this.setState({
      dateData: {
        '2018-2-12': { dots: [this.categoryList.gcp], selected: true },
        '2018-2-24': { dots: [this.categoryList.gcp, this.categoryList.study] },
      },
    });
    console.log(this.state);
  }
  categoryList = {
    study: {
      key: 'study',
      color: 'red',
    },
    gcp: {
      key: 'gcp',
      color: 'blue',
    },
  }
  changeSelectedDay = (date) => {
    this.setState({
      selectedDate: {
        [date]: { selected: true },
      },
    });
  }
  render() {
    return (
      <Container style={{ display: 'flex' }}>
        <View style={{ flex: 2 }}>
          <Calendar
            current={this.state.selectedDate}
            markedDates={this.state.selectedDate}
            onDayPress={(day) => {
              this.changeSelectedDay(day.dateString);
            }}
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
