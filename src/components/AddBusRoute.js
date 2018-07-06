import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col
} from 'react-native-easy-grid';
import {
  StyleSheet
} from 'react-native';
import DTTextInput from './DTTextInput';
import DTButton from './DTButton';
import { connect } from "react-redux";
import { addBusRoute } from '../actions/DublinTransitActions';

class AddBusRoute extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      addBusRoute: PropTypes.func
    })
  };

  constructor (props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleAddRoutePress = () => {
    this.setState({
      isLoading: true
    });
    this.props.actions.addBusRoute(this.state.enteredText);
  }

  handleChangedText = (txt) => {
    this.setState({
      enteredText: txt
    });
  }

  render() {
    return (
      <React.Fragment>
        <Col>
          <DTTextInput
            onChangeText={this.handleChangedText}
            style={styles.textinput}
            placeholder="Bus route"
            maxLength={4}
            value={this.state.enteredText} />
        </Col>
        <Col>
          <DTButton
            style={styles.button}
            text="Add Route"
            onPress={this.handleAddRoutePress}
            isLoading={this.state.isLoading} />
        </Col>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    height: 40
  },
  button: {
    height: 40
  }
});

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    addBusRoute: (routeId) => addBusRoute(routeId)    
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBusRoute)