import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row
} from 'react-native-easy-grid';
import {
  Text
} from 'react-native';

class BusRoute extends Component {
  static propTypes = {
    routeId: PropTypes.string.isRequired
  };

  render() {
    return (
      <Row>
        <Text> Routedd: {this.props.routeId}</Text>
      </Row>
    );
  }
}

export default BusRoute;