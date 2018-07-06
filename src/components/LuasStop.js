import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from '../styles/common';
import {
  Grid,
  Col,
  Row
} from 'react-native-easy-grid';
import { connect } from "react-redux";
import { getNearestLuasStop } from "../actions/DublinTransitActions";
import FontAwesome, { Icons } from 'react-native-fontawesome';

class LuasStop extends Component {
  static propTypes = {
    luasLoading: PropTypes.bool,
    luasstop: PropTypes.object,
    actions: PropTypes.object
  };

  static defaultProps = {
    luasLoading: true
  };

  componentDidMount() {
    this.props.actions.getNearestLuasStop();
  }

  renderTrams() {
    const {
      direction
    } = this.props.luasstop.stopTimes;

    const {
      luasError
    } = this.props;

    const directions = [];

    if (luasError) {
      return (
        <Text style={{ color: 'red' }}>Error: {luasError.message}</Text>
      );
    }

    const maxTrams = direction.reduce((acc, val) => {
      return Math.max(acc, val.tram.length)
    }, 0);

    direction.forEach((dir, i) => {
      const trams = [];
      for (let j = 0; j < maxTrams; j++) {
        if (!dir.tram[j]) {
          trams.push(<Row key={`${i}${j}`} style={styles.tram} />);
        }
        else {
          const tram = dir.tram[j];
          trams.push(
            <Row key={`${i}${j}`} style={styles.tram}>
              <Col size={3}><Text style={[styles.traminfo, styles.tramdest]}>{tram.destination}</Text></Col>
              <Col size={1}><Text style={[styles.traminfo, styles.tramdue]}>{tram.dueMins}</Text></Col>
              {(i === 0) && <Col size={1} />}
            </Row>
          );
        }
      }

      directions.push(
        <Col key={i} style={styles.luasTableCol}>
          {trams}
        </Col>
      );
    });
    return directions;
  }

  renderLoader(size = 'small') {
    return <ActivityIndicator size={size} color="#0044ff" />;
  }

  renderStop() {
    const {
      luasstop,
      luasLoading,
      actions: {
        getNearestLuasStop: getNearestLuasStopHandler
      }
    } = this.props;

    if (!luasstop) {
      return this.renderLoader();
    }
    return (
      <React.Fragment>
        <Col size={80}><Text style={commonStyles.heading}>Luas - {luasstop.displayName}</Text></Col>
        <Col size={20} style={{alignItems: 'flex-end'}}>
          {luasLoading ?
            this.renderLoader() :
            <TouchableOpacity onPress={getNearestLuasStopHandler}>
              <FontAwesome style={{ fontSize: 26, textAlign: 'right'  }}>{Icons.refresh}</FontAwesome>
            </TouchableOpacity>}
        </Col>
      </React.Fragment>
    );
  }

  render() {
    const {
      luasstop,
      luasLoading
    } = this.props;

    if (luasstop) {
      const luasStyles = [styles.luas];
      if (luasLoading) {
        luasStyles.push({ opacity:0.3 });
      }
      return (
        <Grid style={luasStyles}>
          <Row style={{ justifyContent: 'center', alignSelf: 'stretch'}}>
            {this.renderStop()}
          </Row>
          <Row style={{ marginTop: 20 }}>
            {this.renderTrams()}
          </Row>
        </Grid>
      );
    } else {
      return (
        <Grid>
          <Row style={{ justifyContent: 'center', alignSelf: 'stretch', paddingTop: 20 }}>
            {this.renderLoader('large')}
          </Row>
        </Grid>

      )
    }
  }
}

const styles = StyleSheet.create({
  luas: {
    margin: 15,
    flex: 1
  },
  luasTable: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  tram: {
    alignSelf: 'stretch',
  },
  tramdest: {
    alignSelf: 'stretch',
  },
  tramdue: {
    alignSelf: 'stretch',
    textAlign: 'right'
  },
  luasTableCol: {
    justifyContent: 'space-between'
  }
});


const mapStateToProps = state => {
  return state.dublintransit
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getNearestLuasStop: () => dispatch(getNearestLuasStop())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LuasStop)