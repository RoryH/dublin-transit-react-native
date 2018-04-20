import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import commonStyles from '../styles/common';

class LuasStop extends Component {
  renderTrams() {
    const {
      direction
    } = this.props.stop.stopTimes;

    const directions = [];

    direction.forEach((dir, i) => {
      const trams = [];  
      dir.tram.forEach((tram, j) => {
        trams.push(
          <View key={`${i}${j}`} style={styles.tram}>
            <Text style={styles.traminfo}>{tram.destination}</Text>
            <Text style={styles.traminfo}>{tram.dueMins}</Text>
          </View>
        );
      });

      directions.push(
        <View key={i} style={styles.luasTableCol}>
          {trams}
        </View>
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
        <View style={styles.luas}>
          <View>
            <Text style={commonStyles.heading}>{stop.displayName}</Text>
          </View>
          <View style={styles.luasTable}>
            {this.renderTrams()}
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  luas: {
    margin: 15
  },
  luasTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  tram: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  luasTableCol: {
    justifyContent: 'space-between'
  }
})

export default LuasStop;