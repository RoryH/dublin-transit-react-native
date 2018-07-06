import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

class DTTextInput extends Component {
  static propTypes = {
    placeHolder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    disableAutoCorrect: PropTypes.bool,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    keyboardType: PropTypes.string
  }

  static defaultProps = {
    secureTextEntry: false,
    disableAutoCorrect: false,
    keyboardType: 'default',
    onChangeText: () => {},
    style: []
  }

  render() {
    return (
      <View style={DTTextInputStyles.textinputWrapper}>
        <TextInput
          underlineColorAndroid='transparent'
          maxLength={70}
          {...this.props}
          style={[DTTextInputStyles.textinput, this.props.style]}
        />
      </View>
    )
  }
}

const DTTextInputStyles = StyleSheet.create({
  textinput: {
    fontSize: 20,
    alignSelf: 'stretch',
    padding: 10,
    width: '100%'
  },
  textinputWrapper: {
    marginRight: 5,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center'
  }
});

export default DTTextInput;