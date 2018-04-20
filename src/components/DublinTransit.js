import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LuasStop from './LuasStop';
import commonStyles from '../styles/common';

class DublinTransit extends Component {
  componentDidMount() {
    this.props.getNearestLuasStop();
  }
  render () {
    const {
      loading,
      luasstop
    } = this.props.dublintransit;

    return (
      <View>
        {loading && <Text style={commonStyles.heading}>Loading...</Text>}
        <LuasStop stop={luasstop} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  stationName: {
    fontSize: 20
  }
});

export default DublinTransit;