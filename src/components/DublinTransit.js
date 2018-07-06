import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import LuasStop from './LuasStop';
import BusRoutes from './BusRoutes';
import {
  Grid,
  Row
} from 'react-native-easy-grid';

class DublinTransit extends Component {
  render () {
    return (
      <ScrollView>
        <Grid>
          <Row>
            <LuasStop />
          </Row>
          <Row>
            <BusRoutes />
          </Row>
        </Grid>
      </ScrollView>
    );
  }
}

export default DublinTransit;