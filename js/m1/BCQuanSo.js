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

import EmptyScreen from "./empty.js";
import * as MyConst from './const.js';
import ChartMonth from './ChartMonth.js';

// import Picker from "react-native-picker";
// import {Cpicker,Tpicker} from 'react-native-tpicker';
// import {CascadePicker} from 'react-native-picker-xg';

import styles from "./styles";

const Item = Picker.Item;


class BCQuanSo extends Component {


 constructor(props) {
    super(props);

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth().toString();
    let years = [];
    for (var i = MyConst.MIN_YEAR; i <= currentYear; i++) {
        years.push(i);
    }
    
    this.state = {
      isLoaded: false,
      isChartView: false,
      reportType:"1",
      dept: 0,
      year: currentYear,
      month: currentMonth,
      years: years,
    };
  }

  onChangeDepartment(value) {
    this.setState({
      dept: value
    });
    this.getReportData(this.state.reportType, this.state.year, value);
  }

  onChangeYear(value) {
    this.setState({
      year: value
    });
    this.getReportData(this.state.reportType, value, this.state.dept);
  }

  componentWillMount() {
    
   let url = MyConst.WS_URL + 'common/department';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoaded: true,
          departments : responseJson});
         this.getReportData(this.state.reportType, this.state.year, this.state.dept);
      })
      .catch((error) => {
        console.log("WS: " + url);
        console.log(error);
      });     
  }

  onChangeReportType(value) {
    this.setState({
      reportType: value
    });
    this.getReportData(value, this.state.year, this.state.dept);
  }

  onBtnSwitch(){

    this.setState({
        isChartView: !this.state.isChartView,
    });
  }

  getReportData(reportType, year, deptId) {

    if(!year) {
      this.setState({
            reportData: []});
      return;
    }

    if(!deptId)
      deptId = 0;

    let url = MyConst.WS_URL + 'report/bchr?type=' + reportType + '&year=' + year + '&deptId=' + deptId;
    fetch(url)
      .then(res => res.json())
      .then(responseJson => {


          let chartData = new Array();
          for (var i = 1; i <=12; i++) {
            let numOfMonth = 0;
            for(item of responseJson) {
                if(item.month == ("T" + i) || item.month == ("T0" + i)) {
                  numOfMonth = item.value;
                  break;
                }
            }

            //var aa = JSON.stringify({'x': i, 'y': numOfMonth});
            chartData.push({"x": i - 1, "y": numOfMonth});
          }

          this.setState({
              reportData: responseJson,            
              chartData: [chartData],
            });
      }).catch(error => {
        console.log("WS: " + url);
        console.log(error);
        this.setState({
            reportData: []});
      });
  }

  render() {

    try {

        if (!this.state.isLoaded) {
          return <EmptyScreen/>
        }

        let deptItems = this.state.departments.map((item) => {return (<Item label={item.name} value={item.id} key={item.id}/>)});
        let monthItems = Object.keys(MyConst.CONST_MONTHS).map((key) => {return (<Item label={MyConst.CONST_MONTHS[key]} value={key} key={key}/>)});
        let yearItems = this.state.years.map((item, index) => {return (<Item label={item.toString()} value={item} key={item}/>)});

        return (
          <Container>
            <Header>
              <Left style={{flex:1}}>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                  <Icon name="ios-menu" />
                </Button>
              </Left>
              <Body style={{flex:4, alignItems:"flex-start"}}>
                <Title>Báo cáo NS - TL</Title>
              </Body>
              
            </Header>

            <Grid>
              <Row style={styles.headerParam}> 
                <Card>                  
                <CardItem style={styles.cardItem}>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={[styles.paramText, {flex: 1}]}>Phòng ban</Text>
                    </Left>
                    <Body style={{flex: 4, flexDirection: 'row'}}>
                      <Picker
                              mode="dialog"
                              placeholder="Chọn phòng ban"
                              selectedValue={this.state.dept}
                              onValueChange={this.onChangeDepartment.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={[styles.picker,{ width: Platform.OS === "ios" ? undefined : 200 }]}
                            >
                          {deptItems}
                        </Picker>
                    </Body>
                    <Right style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>                      
                      <Button bordered rounded small style={{paddingLeft:5, paddingRight:5, marginRight:5}}
                        onPress={() => this.onBtnSwitch()}>
                        <Icon active name="grid" />
                      </Button>  
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                      <Left style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.paramText, {flex: 1}]}>Năm</Text>
                      </Left>
                      <Body style={{flex: 1, flexDirection: 'row'}}>
                        <Picker
                                mode="dialog"
                                placeholder="Chọn năm"
                                selectedValue={this.state.year}
                                onValueChange={this.onChangeYear.bind(this)}
                                headerStyle={styles.pickerHeader}
                                headerBackButtonTextStyle={styles.textDefault}
                                headerTitleStyle={styles.textDefault}
                                style={[styles.picker,{ width: Platform.OS === "ios" ? undefined : 100 }]}
                              >
                            {yearItems}
                          </Picker>
                      </Body>
                      <Right style={{flex: 2, flexDirection: 'row'}}>
                          <Text style={[styles.paramText, {flex: 1}]}>Loại báo cáo</Text>
                      </Right>
                      <Right style={{flex: 2, flexDirection: 'row'}}>                          
                          <Picker
                              mode="dialog"
                              selectedValue={this.state.reportType}
                              onValueChange={this.onChangeReportType.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={[styles.picker,{ width: Platform.OS === "ios" ? undefined : 150 }]}
                            >                           
                           <Item label="Quân số" value="1" />
                           <Item label="Lương BQ" value="2" />
                        </Picker>                       
                      </Right>
                  </CardItem>
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem cardBody style={{flex:1}}>
                  <Body style={{flex:1}}>
                  { this.state.isChartView? ( 
                      <ScrollView>
                       <ChartMonth data={this.state.chartData}/>
                      </ScrollView>
                    ) : (
                    <FlatList
                        data={this.state.reportData}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListHeaderComponent={() => 
                                    <ListItem style={styles.liHeader}>
                                      <Text style={[styles.liTextHeader, {width:"70%"}]}>Tháng</Text>                                      
                                      <Text style={[styles.liTextHeader, {width:"30%", textAlign:"right"}]}>
                                      { this.state.reportType == '1'? ('Quân số') : ('Lương BQ (triệu)') 
                                      }
                                      
                                      </Text>
                                    </ListItem>}
                        renderItem={this._renderListItem}
                      >
                    </FlatList>
                   )}
                  </Body>
                </CardItem>
              </Card>
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
                <Text style={[styles.liText, {width:"70%"}]}>{item.month}</Text>                
                <Text style={[styles.liText, {width:"30%", textAlign:"right"}]}>{MyConst._convertNumber(item.value)}</Text>
                {/* <TextMask	style={[styles.liText, {width:"30%", textAlign:"right"}]} value={item.value}	type={'money'}	options={{unit: '', precision: 0}} /> */}
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"70%"}]}>{item.month}</Text>                
                <Text style={[styles.liText, {width:"30%", textAlign:"right"}]}>{MyConst._convertNumber(item.value)}</Text>
                {/* <TextMask	style={[styles.liText, {width:"30%", textAlign:"right"}]} value={item.value}	type={'money'}	options={{unit: '', precision: 0}} /> */}
              </ListItem>      
    }
  }  
}

export default BCQuanSo;
