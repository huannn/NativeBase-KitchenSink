import React, { Component } from "react";
import {AppRegistry,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
    Platform,
    StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  Picker,
  List, 
  ListItem, 
  Text,
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import {TextMask} from 'react-native-masked-text';

import ChartBar from './ChartBar.js';

import EmptyScreen from "./empty.js";
import * as MyConst from './const.js';

// import Picker from "react-native-picker";
// import {Cpicker,Tpicker} from 'react-native-tpicker';
//import {CascadePicker} from 'react-native-picker-xg';

import styles from "./styles";

const Item = Picker.Item;


class BCToChucLaoDongChiTiet extends Component {


 constructor(props) {
    super(props);

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth().toString();
    let years = [];
    for (var i = MyConst.MIN_YEAR; i <= currentYear; i++) {
        years.push(i);
    }

    // console.log('=========================================================');
    // console.log(this.props);
    // console.log("state : " + this.props.navigation.state.params.subType);

    let chartData = [];
    chartData.push([{
      'v': this.props.navigation.state.params.value2,
      'name': 'Năm ' + (this.props.navigation.state.params.year - 2)
    }, {
      'v': this.props.navigation.state.params.value1,
      'name': 'Năm ' + (this.props.navigation.state.params.year - 1)
    }, {
      'v': this.props.navigation.state.params.value,
      'name': 'Năm ' + this.props.navigation.state.params.year
    }]);
    
    this.state = {
      isLoaded: false,
      isChartView: false,
      subType: this.props.navigation.state.params.subType,
      subReportName: this.props.navigation.state.params.subReportName,
      numberRow: "10",
      year: currentYear,
      month: currentMonth,
      years: years,
      chartData: chartData,
    };
  }

  onBtnSwitch(){

    this.setState({
        isChartView: !this.state.isChartView,
    });
  }

  componentWillMount() {
    
    this.getReportData(this.state.subType, this.state.year);
  }

  getReportData(subType, year) {

    // if(!subType)
    //   subType = 0;

    // let url = MyConst.WS_URL + 'report/bctcld?type=2&year=' + year + '&subType=' + subType;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(responseJson => {

    //     this.setState({
    //         reportData: responseJson});
    //   })
    //   .catch(error => {
    //     console.log("WS: " + url);
    //     console.log(error);
    //     this.setState({
    //         reportData: []});
    //   });
  };

  render() {

    try {

        return (
          <Container>
            <Header>
              <Left style={{flex:1}}>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body style={{flex:4, alignItems:"flex-start"}}>
                <Title>{this.state.subReportName}</Title>
              </Body>              
            </Header>

            <Grid>    
              <Row style={{flex:1}}>
                <Card>     
                <CardItem cardBody>
                    <Body>        
                        <ScrollView>
                         <ChartBar data={this.state.chartData} height={100}/>
                        </ScrollView>                    
                    </Body>
                  </CardItem>
                </Card>
              </Row>          
              <Row style={{flex:2}}> 
                
              </Row>
            </Grid>
          </Container>
        );

     } catch (err) {

      console.log(err);
      return <EmptyScreen/>
    }
  }


  _renderListItem({item, index}) {

    if(index % 2 == 0)  {
      return  <ListItem style={styles.liEven}>
                <Text style={[styles.liText, {width:"25%"}]}>{item.name}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ1)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ2)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ3)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ4)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.value)}</Text>

                {/* <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ1}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ2}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ3}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ4}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.value}	type={'money'}	options={{unit: '', precision: 0}} /> */}
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"25%"}]}>{item.name}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ1)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ2)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ3)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.valueQ4)}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{MyConst._convertNumber(item.value)}</Text>

                {/* <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ1}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ2}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ3}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.valueQ4}	type={'money'}	options={{unit: '', precision: 0}} />
                <TextMask	style={[styles.liText, {width:"15%", textAlign:"right"}]} value={item.value}	type={'money'}	options={{unit: '', precision: 0}} /> */}
              </ListItem>
    }
  }  
}

export default BCToChucLaoDongChiTiet;
