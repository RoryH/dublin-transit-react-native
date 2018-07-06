import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

class DTButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    isLoading: false
  };

  render() {
    const {
      text,
      isLoading,
      onPress
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={DTButtonStyles.button}>
        {isLoading ?
          <Text style={[DTButtonStyles.buttonText, { color: '#b66' }]}>Loading...</Text> :
          <Text style={DTButtonStyles.buttonText}>{text}</Text>}
      </TouchableOpacity>
    )
  }
}

const DTButtonStyles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#f18b21',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default DTButton;