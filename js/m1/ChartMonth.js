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

import React, { Component } from 'react'
import { View, Platform, StyleSheet} from 'react-native'
import { StockLine } from 'react-native-pathjs-charts'
import moment from 'moment'
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

class ChartMonth extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'StockLine - Dynamic Labels',
  });
  render() {

    // let data = [
    //   [{
    //     "x": 0,
    //     "y": 47782
    //   }, {
    //     "x": 1,
    //     "y": 48497
    //   }, {
    //     "x": 2,
    //     "y": 77128
    //   }, {
    //     "x": 3,
    //     "y": 73413
    //   }, {
    //     "x": 4,
    //     "y": 58257
    //   }, {
    //     "x": 5,
    //     "y": 40579
    //   }, {
    //     "x": 6,
    //     "y": 72893
    //   }, {
    //     "x": 7,
    //     "y": 60663
    //   }, {
    //     "x": 8,
    //     "y": 15715
    //   }, {
    //     "x": 9,
    //     "y": 40305
    //   }, {
    //     "x": 10,
    //     "y": 68592
    //   }, {
    //     "x": 11,
    //     "y": 95664
    //   }, {
    //     "x": 12,
    //     "y": 17908
    //   }, {
    //     "x": 13,
    //     "y": 22838
    //   }, {
    //     "x": 14,
    //     "y": 32153
    //   }, {
    //     "x": 15,
    //     "y": 56594
    //   }, {
    //     "x": 16,
    //     "y": 76348
    //   }, {
    //     "x": 17,
    //     "y": 46222
    //   }, {
    //     "x": 18,
    //     "y": 59304
    //   }],
    //   [{
    //     "x": 0,
    //     "y": 132189
    //   }, {
    //     "x": 1,
    //     "y": 61705
    //   }, {
    //     "x": 2,
    //     "y": 154976
    //   }, {
    //     "x": 3,
    //     "y": 81304
    //   }, {
    //     "x": 4,
    //     "y": 172572
    //   }, {
    //     "x": 5,
    //     "y": 140656
    //   }, {
    //     "x": 6,
    //     "y": 148606
    //   }, {
    //     "x": 7,
    //     "y": 53010
    //   }, {
    //     "x": 8,
    //     "y": 110783
    //   }, {
    //     "x": 9,
    //     "y": 196446
    //   }, {
    //     "x": 10,
    //     "y": 117057
    //   }, {
    //     "x": 11,
    //     "y": 186765
    //   }, {
    //     "x": 12,
    //     "y": 174908
    //   }, {
    //     "x": 13,
    //     "y": 75247
    //   }, {
    //     "x": 14,
    //     "y": 192894
    //   }, {
    //     "x": 15,
    //     "y": 150356
    //   }, {
    //     "x": 16,
    //     "y": 180360
    //   }, {
    //     "x": 17,
    //     "y": 175697
    //   }, {
    //     "x": 18,
    //     "y": 114967
    //   }],
    //   [{
    //     "x": 0,
    //     "y": 125797
    //   }, {
    //     "x": 1,
    //     "y": 256656
    //   }, {
    //     "x": 2,
    //     "y": 222260
    //   }, {
    //     "x": 3,
    //     "y": 265642
    //   }, {
    //     "x": 4,
    //     "y": 263902
    //   }, {
    //     "x": 5,
    //     "y": 113453
    //   }, {
    //     "x": 6,
    //     "y": 289461
    //   }, {
    //     "x": 7,
    //     "y": 293850
    //   }, {
    //     "x": 8,
    //     "y": 206079
    //   }, {
    //     "x": 9,
    //     "y": 240859
    //   }, {
    //     "x": 10,
    //     "y": 152776
    //   }, {
    //     "x": 11,
    //     "y": 297282
    //   }, {
    //     "x": 12,
    //     "y": 175177
    //   }, {
    //     "x": 13,
    //     "y": 169233
    //   }, {
    //     "x": 14,
    //     "y": 237827
    //   }, {
    //     "x": 15,
    //     "y": 242429
    //   }, {
    //     "x": 16,
    //     "y": 218230
    //   }, {
    //     "x": 17,
    //     "y": 161511
    //   }, {
    //     "x": 18,
    //     "y": 153227
    //   }]
    // ]

    // console.log('width:' + Dimensions.get('window').width);
    // console.log('height:' + Dimensions.get('window').height);

    let options = {
      width: Dimensions.get('window').width - MyConst.MARGIN_CHART.width,
      height: Dimensions.get('window').height - MyConst.MARGIN_CHART.height,
      color: '#2980B9',
      margin: {
        top: 30,
        left: 35,
        bottom: 20,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      showAreas: true,
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [ {value:'T1'},
                      {value:'T2'},
                      {value:'T3'},
                      {value:'T4'},
                      {value:'T5'},
                      {value:'T6'},
                      {value:'T7'},
                      {value:'T8'},
                      {value:'T9'},
                      {value:'T10'},
                      {value:'T11'},
                      {value:'T12'},
                    ],
        // labelFunction: ((v) => {
        //   let d = moment('2016-10-08 14:00','YYYY-MM-DD HH:mm')
        //   return d.add((v * 2),'hours').format('h:mm A')
        // }),
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: false,
        showLines: true,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    console.log(this.props.data);

    return (
      <View style={styles.container}>
        <StockLine data={this.props.data} options={options} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default ChartMonth;
