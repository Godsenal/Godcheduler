import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'native-base';

const styles = StyleSheet.create({
  outSide: {
    marginHorizontal: 3,
  },
  textWrapper: {
    backgroundColor: '#cfd3d0',
    borderWidth: 5,
    borderColor: '#cfd3d0',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  text: {
    color: '#25272d',
    paddingTop: 3,
    paddingLeft: 3,
  },
});

const CalDataHeader = ({ date }) => (
  <View style={styles.outSide}>
    <View style={styles.textWrapper}>
      <Text style={styles.text}>{date}</Text>
    </View>
  </View>
);

export default CalDataHeader;
