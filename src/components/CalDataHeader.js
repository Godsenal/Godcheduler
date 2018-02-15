import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'native-base';

const styles = StyleSheet.create({
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

const CalDataHeader = (props) => {
  const {
    date,
  } = props;

  return (
    <View style={styles.textWrapper}>
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};

export default CalDataHeader;
