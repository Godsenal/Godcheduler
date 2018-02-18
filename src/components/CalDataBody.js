import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  outSide : {
    paddingLeft: 3,
    paddingRight: 3,
  },
  card: {
    padding: 5,
    backgroundColor: '#cfd3d0',
  },
  wrapper: {
    backgroundColor: '#f1f1f1',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  labelStyle: {
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

const CalDataBody = (props) => {
  const {
    time,
    name,
    describe,
    category,
  } = props;

  const { color } = category;
  const labelStyle = StyleSheet.flatten([styles.labelStyle, { backgroundColor: color }]);

  return (
    <View style={styles.outSide}>
      <View style={styles.card}>
        <View style={styles.wrapper}>
          <View style={labelStyle} />
          <View style={{ display: 'flex', padding: 5 }}>
            <Text style={{ color: '#cfd3d0' }}>{time}</Text>
            <Text>{name}</Text>
            <Text>{describe}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalDataBody;
