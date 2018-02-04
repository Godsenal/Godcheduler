import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

class ImminentList extends Component {
  state = {
    data:[
      {color: '#13CE66',description:'김범준 밥주기',date: '1일 전'},
      {color: '#F2FF00',description:'김범준과 재미있는 프로그래밍',date: '3일 전'},
      {color: '#FA687F',description:'은학이 따라잡기',date: '4일 전'},
      {color: '#4387D6',description:'이마 때리기',date: '5일 전'},
    ]  
  }
  render() {
    let {data} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{color: '#FBFBFB'}} >Imminent Tasks</Text>
        <View style={styles.listContainer}>
          {
            data.map((el,i)=>{
              return(
                <View key={i} style={styles.listItem}>
                  <View style={[styles.listCategory,{backgroundColor: el.color}]} />
                  <Text style={styles.listText}>
                    {
                      el.description.length < 20 ?
                        el.description
                        :el.description.substr(0,20) + '...'
                    }
                  </Text>
                  <Text style={styles.listDate}>{el.date}</Text>
                </View>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#95D5F1',
    overflow: 'hidden',
  },
  listContainer: {
    height: 80,
  },
  listItem: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FBFBFB',
    marginTop: 10
  },
  listCategory: {
    flex: 0.5,
    width: 30,
    height: 30,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  listText: {
    flex: 5,
    marginLeft: 10,
  },
  listDate: {
    flex: 0.7,
    color: '#ccc',
    fontSize : 10,
  }
})
export default ImminentList;