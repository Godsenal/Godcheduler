import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  categoryName: {
    flex: 5,
    overflow: 'hidden',
    color: 'white',
  },
  categoryRight: {
    color: 'white',
  },
});

class CategoryList extends Component {
  static propTypes = {
    handleCategoryClick: PropTypes.func.isRequired,
  }
  state = {
    categories: [
      { name: 'Kim BumJune', color: '#13CE66', id: '1' },
      { name: 'Game', color: '#4387D6', id: '2' },
      { name: 'Eunhack', color: '#FA687F', id: '3' },
      { name: 'Eunhack', color: '#FA687F', id: '4' },
      { name: 'Eunhack', color: '#FA687F', id: '5' },
      { name: 'Eunhack', color: '#FA687F', id: '6' },
      { name: 'Eunhack', color: '#FA687F', id: '7' },
      { name: 'Eunhack', color: '#FA687F', id: '8' },
      { name: 'Eunhack', color: '#FA687F', id: '9' },
    ],
  }
  render() {
    const { categories } = this.state;
    return (
      <View style={styles.container}>
        {
          categories.map(el => (
            <TouchableOpacity key={el.id} onPress={() => this.props.handleCategoryClick(el)} >
              <View style={[styles.listItem, { backgroundColor: el.color }]}>
                <Text style={styles.categoryName}>{el.name}</Text>
                <Text style={styles.categoryRight}>3 </Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}


export default CategoryList;
