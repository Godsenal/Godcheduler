import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  outSide: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 7,
  },
  footer: {
    backgroundColor: '#cfd3d0',
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const CalDataFooter = () => {
  const {
    footer,
  } = styles;

  return (
    <View style={styles.outSide}>
      <View style={footer} />
    </View>
  );
};

export default CalDataFooter;
