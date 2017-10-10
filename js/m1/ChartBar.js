/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

'use strict'

import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet} from 'react-native';
import { Bar } from 'react-native-pathjs-charts'
import Dimensions from 'Dimensions';
import * as MyConst from './const.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class ChartBar extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bar (Column) - Basic',
  });
  render() {
    // let data = [
    //   [{
    //     "v": 49,
    //     "name": "apple"
    //   }, {
    //     "v": 42,
    //     "name": "apple"
    //   }],
    //   [{
    //     "v": 69,
    //     "name": "banana"
    //   }, {
    //     "v": 62,
    //     "name": "banana"
    //   }],
    //   [{
    //     "v": 29,
    //     "name": "grape"
    //   }, {
    //     "v": 15,
    //     "name": "grape"
    //   }]
    // ]

    let options = {
      width: this.props.width? this.props.width : Dimensions.get('window').width - MyConst.MARGIN_CHART.width,
      height: this.props.height? this.props.height : Dimensions.get('window').height - MyConst.MARGIN_CHART.height,
      margin: {
        top: 20,
        left: 40,
        bottom: 50,
        right: 0
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
          rotate: 315
        }
      },
      axisY: {
        showAxis: false,
        showLines: true,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        }
      }
    }

    let chartData = this.props.data[0];
    let hasData = false;
    for(let item of chartData) {
      if(item.v != 0) {
        hasData = true;
        break;
      }
    }

    return (
      <View style={styles.container}>
        
        { hasData ? (
          <Bar data={this.props.data} options={options} accessorKey='v'/>
        ) : (
          <Text>Không có dữ liệu</Text>
        )}
          
        
      </View>
    )
  }
}

export default ChartBar;
