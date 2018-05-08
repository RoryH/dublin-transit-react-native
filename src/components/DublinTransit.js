import React, { Component } from 'react';
import {
  Text,
  ScrollView
} from 'react-native';
import LuasStop from './LuasStop';
import commonStyles from '../styles/common';
import {
  Grid
} from 'react-native-easy-grid';
import { connect } from 'react-redux'
import {
  getNearestLuasStop
} from '../actions/DublinTransitActions';

class DublinTransit extends Component {
  componentDidMount() {
    this.props.actions.getNearestLuasStop();
  }
  render () {
    const {
      actions,
      luasstop
    } = this.props.dublintransit;

    return (
      <ScrollView>
        <Grid>
          <LuasStop stop={luasstop} actions={actions} />
        </Grid>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return state
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getNearestLuasStop: () => dispatch(getNearestLuasStop())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DublinTransit)