import React, { Component } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

import { DoubleTapWrapper } from '../components';

const today = moment(new Date()).format('YYYY-MM-DD');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 1,
    padding: 10,
  },
  item: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#FBFBFB',
  },
  row: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
export default class ListInCategory extends Component {
  constructor(props) {
    super(props);
    this.lastTap = {};
  }
  state = {
    data: Array(50).fill(0).map((item, i) => (
      { text: `일정 ${i + 1}`, id: `${i}`, date: moment(new Date().setDate(new Date().getDate() + (i / 2))).format('YYYY-MM-DD') }
    )),
    sections: [],
    removeQueue: [],
    removeItem: '',
  }
  componentWillMount() {
    this.groupByDate(this.state.data);
  }
  onDoubleTap = (date, id) => {
    this.setState(prevState => ({
      removeQueue: [...prevState.removeQueue, { date, id }],
      removeItem: id,
    }));
  }
  groupByDate = (data) => {
    const sections = [];
    let index = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (sections.length <= 0) {
        sections.push({ date: today, data: [] });
      }

      if (sections[index].date === data[i].date) {
        sections[index].data.push(data[i]);
      } else {
        index += 1;
        sections.push({ date: data[i].date, data: [data[i]] });
      }
    }
    this.setState({
      sections,
    });
  }
  /* ㅈ같네.. 이거 어카지 */
  removeItem = () => {
    this.setState((prevState) => {
      const { date, id } = prevState.removeQueue[prevState.removeQueue.length - 1];
      const newArr = prevState.sections.slice();
      let findIndex = -1;

      for (let i = 0; i < newArr.length; i += 1) {
        if (newArr[i].date === date) {
          findIndex = i;
        }
      }
      if (findIndex >= 0) {
        newArr[findIndex].data = newArr[findIndex].data.filter(item => (
          item.id !== id
        ));
        if (newArr[findIndex].data.length <= 0) {
          newArr.splice(findIndex, 1);
        }
        return {
          sections: newArr,
          removeQueue: prevState.removeQueue.filter((_, i) => (
            i !== prevState.removeQueue.length - 1
          )),
        };
      }
      return null;
    });
  }
  _renderItem = ({ item }) => (
    <DoubleTapWrapper
      key={item.id}
      {...item}
      style={styles.item}
      onDoubleTap={() => this.onDoubleTap(item.date, item.id)}
      animation
      innerStyle={styles.row}
      animationComponent={<Icon name="check" color="#FBFBFB" size={20} />}
      onAnimationEnd={() => this.removeItem(item.date, item.id)}
    >
      <Text style={{ color: 'black' }}>
        {item.text}
      </Text>
    </DoubleTapWrapper>
  );
  render() {
    const { sections } = this.state;
    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          renderSectionHeader={
            ({ section }) => (
              <View style={{ backgroundColor: '#FBFBFB' }}>
                <Text style={{ padding: 10 }}>{today === section.date ? '오늘' : section.date}</Text>
              </View>
            )
          }
        />
      </View>
    );
  }
}
