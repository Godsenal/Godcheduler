import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/account';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#04ACF4',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: '#04ACF4',
  },
});

const Login = ({ loginAction }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={loginAction}>
      <Text style={styles.text}> 로그인! </Text>
    </TouchableOpacity>
  </View>
);

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isLoggedIn: state.account.get('isLoggedIn'),
});

const mapDispatchToProps = dispatch => ({
  loginAction: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
