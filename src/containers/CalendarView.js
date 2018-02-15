import React from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { Container, View, Text } from 'native-base';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import CalDataHeader from '../components/CalDataHeader';
import CalDataBody from '../components/CalDataBody';

const styles = StyleSheet.create({
  container: {
    flex: 1.8,
  },
  bottomList: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
  },
  buttomListHeader: {
    textAlign: 'center',
    backgroundColor: '#C1C1C1',
    borderRadius: 4,
  },
});

class CalendarView extends React.Component {
  /* state :
      selected : 선택된 날짜
      scheduldData : 각 날짜별 데이터
      calData : 위 두개를 조합해서 실제로 캘린더가 받는 데이터
  */
  state = {
    userSchedule: [{
      date: '2018-02-12',
      data: [{
        time: '20:21',
        name: '어디로 갈까요',
        describe: '어디로 갈지 잘 모르겠어요',
        category: {
          key: 'study',
          color: 'red',
        },
      }, {
        time: '17:32',
        name: '나는 아무것도 몰라요',
        describe: '죽기',
        category: {
          key: 'GCP',
          color: 'blue',
        },
      },
      ],
    }],
    scheduleData: {
      '2018-02-12': { dots: [{ key: 'hoho', color: 'red', selectedColor: 'red' }, { key: 'notads', color: 'blue' }] },
    },
    selected: '',
    calData: {},
  };

  componentDidMount() {
    this.makeCalendarData(moment().format('YYYY-MM-DD'));
  }

  changeSelectedDay = (date) => {
    this.makeCalendarData(date.dateString);
  }

  makeCalendarData = (day) => {
    this.setState({
      selected: day,
      calData: {
        ...this.state.scheduleData,
        [day]: Object.assign({}, this.state.scheduleData[day], { selected: true }),
      },
    });
  }

  _renderItem = ({ item }) => (
    <CalDataBody time={item.time} name={item.name} describe={item.describe} category={item.category} />
  )

  _renderSectionHeader = ({ section }) => (
    <CalDataHeader date={section.date} />
  )

  render() {
    const {
      calData, userSchedule,
    } = this.state;

    return (
      <Container style={{ display: 'flex' }}>
        <View style={styles.container}>
          <Calendar
            displayLodingIndicator
            markingType="multi-dot"
            onDayPress={this.changeSelectedDay}
            markedDates={calData}
          />
        </View>
        {/* 하단 카테고리 목록 */}
        <View style={styles.bottomList}>
          <Text style={styles.buttomListHeader}>{moment(this.state.selected).format('YYYY')}년 {moment(this.state.seleted).format('M')}월 {moment(this.state.selected).format('DD')} 일의 일정</Text>
          <SectionList
            sections={userSchedule}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            keyExtractor={item => (
              item.name
            )}
          />
        </View>
      </Container>
    );
  }
}

export default CalendarView;
