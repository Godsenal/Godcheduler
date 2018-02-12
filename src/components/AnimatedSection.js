import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AnimatedCard from './AnimatedCard';
import { DoubleTapWrapper, LightBox } from './';
import { color } from '../config';


const styles = StyleSheet.create({
  cardHeader: {
    backgroundColor: color.skyblue,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 10,
  },
  row: {
    padding: 10,
  },
  item: {
    height: 50,
    backgroundColor: '#E9E9E9',
    marginTop: 5,
    borderRadius: 5,
  },
});
export default class AnimatedSection extends Component {
  state = {
    data: Array(50).fill(0).map((item, i) => (
      { text: `일정 ${i + 1}`, id: `${i}` }
    )),
    removeQueue: [],
    removeItem: '',
  }
  onDoubleTap = (date, id) => {
    this.setState(prevState => ({
      removeQueue: [...prevState.removeQueue, { date, id }],
      removeItem: id,
    }));
  }
  removeItem = (id) => {
    this.setState(prevState => ({
      data: prevState.data.filter(item => item.id !== id),
      removeQueue: prevState.removeQueue.slice(0, -1),
    }));
  }
  render() {
    return (
      <ScrollView>
        <LightBox>
          <AnimatedCard header="오늘">
            {this.state.data.slice(0, 10).map(item => (
              <DoubleTapWrapper
                key={item.id}
                {...item}
                style={styles.item}
                onDoubleTap={() => this.onDoubleTap(item.id)}
                animation
                innerStyle={styles.row}
                animationComponent={<Icon name="check" color="#FBFBFB" size={20} />}
                onAnimationEnd={() => this.removeItem(item.id)}
              >
                <Text style={{ color: 'black' }}>
                  {item.text}
                </Text>
              </DoubleTapWrapper>
            ))}
          </AnimatedCard>
        </LightBox>
        <LightBox>
          <AnimatedCard header="오늘">
            {this.state.data.slice(0, 10).map(item => (
              <DoubleTapWrapper
                key={item.id}
                {...item}
                style={styles.item}
                onDoubleTap={() => this.onDoubleTap(item.id)}
                animation
                innerStyle={styles.row}
                animationComponent={<Icon name="check" color="#FBFBFB" size={20} />}
                onAnimationEnd={() => this.removeItem(item.id)}
              >
                <Text style={{ color: 'black' }}>
                  {item.text}
                </Text>
              </DoubleTapWrapper>
            ))}
          </AnimatedCard>
        </LightBox>
      </ScrollView>
    );
  }
}
