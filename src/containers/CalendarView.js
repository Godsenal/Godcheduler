import React, { Component } from 'react';
import {View, Container, Text, Header, Body, Title, Content} from 'native-base';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import PropTypes from 'prop-types';

class CalendarView extends Component {
  //state!
  state = {
    today: '',
    selectedDate: {
    }
    
  };
  
  static propTypes = {
  }
  
  componentWillMount() {
    changeSelectedDay(moment().format('YYYY-MM-DD'));
  }

  changeSelectedDay = (date) => {
    this.setState({
      selectedDate: {
        [date]: {selected: true}
      },
      
    })
    console.log(this.state.selectedDate);
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>this is Calendar View</Text>
          </Body>
        </Header>
        <Content>
          <Calendar
            current = {this.state.today}
            markedDates = {this.state.selectedDate}
            onDayPress = {(day) => {
              changeSelectedDay(day.dateString);
            }}
          />
        </Content>
      </Container>
    )
  }
}



export default CalendarView;