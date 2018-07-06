import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BusRoute from './BusRoute';
import {
  Grid,
  Row
} from 'react-native-easy-grid';
import {
  Text
} from 'react-native';
import { connect } from "react-redux";
import AddBusRoute from './AddBusRoute';
import { getBusRoutes } from '../actions/DublinTransitActions';

class BusRoutes extends Component {
  static propTypes = {
    routes: PropTypes.array,
    error: PropTypes.object,
    actions: PropTypes.shape({
      getBusRoutes: PropTypes.func
    })
  };

  static defaultProps = {
    routes: []
  };

  componentDidMount() {
    this.props.actions.getBusRoutes();
  }

  renderRoutes () {
    return this.props.routes.map((route) => {
      return (
        <BusRoute key={route} routeId={route} />
      );
    });
  }

  maybeRenderError() {
    const {
      error
    } = this.props;

    if (error) {
      return (
        <Row>
          <Text>{error.message}</Text>
        </Row>
      )
    }
  }

  render() {
    return (
      <Grid>
        {this.renderRoutes()}
        {this.maybeRenderError()}
        <Row>
          <AddBusRoute />
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    routes: state.dublintransit.busRoutes,
    error: state.dublintransit.busRoutesError
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getBusRoutes: () => dispatch(getBusRoutes())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BusRoutes)