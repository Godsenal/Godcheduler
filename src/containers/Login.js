import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {login} from '../actions/account';

class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.login}>
          <Text style={styles.text}> 로그인! </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
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
    padding: 10
  },
  text: {
    textAlign: 'center',
    color: '#04ACF4',
  }
})
const mapStateToProps = (state) => ({
  isLoggedIn: state.account.get('isLoggedIn'),
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(login());
    }
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
