import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
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
  renderTrams() {
    const {
      direction
    } = this.props.stop.stopTimes;

    const directions = [];

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

  render() {
    const {
      stop
    } = this.props;

    if (stop) {
      return (
        <Grid style={styles.luas}>
          <Row style={{ alignSelf: 'stretch'}}>
            <Col><Text style={commonStyles.heading}>Luas - {stop.displayName}</Text></Col>
            <Col style={{textAlign: 'right' }}>
              <FontAwesome style={{ fontSize: 20, textAlign: 'right'  }}>{Icons.refresh}</FontAwesome>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            {this.renderTrams()}
          </Row>
        </Grid>
      );
    } else {
      return null;
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
  return state
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getNearestLuasStop: () => dispatch(getNearestLuasStop())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LuasStop)