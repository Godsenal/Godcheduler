import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#717073',
    display: 'flex',
    flexDirection: 'column',
  },
  labelStyle: {
    padding: 15,
    borderRadius: 180,
  },
});

const CalDataBody = (props) => {
  const {
    time,
    name,
    describe,
    category,
  } = props;

  console.log(styles.labelStyle);

  return (
    <View style={styles.wrapper}>
      <View style={StyleSheet.flatten([styles.labelStyle, StyleSheet.create({ backgroundColor: [category.color] })])} />
      <View style={{ display: 'flex' }}>
        <Text style={{ color: '#cfd3d0' }}>{time}</Text>
        <Text>{name}</Text>
        <Text>{describe}</Text>
      </View>
    </View>
  );
};

export default CalDataBody;
