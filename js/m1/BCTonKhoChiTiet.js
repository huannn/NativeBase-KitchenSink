import React, { Component } from "react";
import {AppRegistry,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
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
import ChartBar from './ChartBar.js';

import EmptyScreen from "./empty.js";
import * as MyConst from './const.js';

// import Picker from "react-native-picker";
// import {Cpicker,Tpicker} from 'react-native-tpicker';
//import {CascadePicker} from 'react-native-picker-xg';

import styles from "./styles";

const Item = Picker.Item;


class BCTonKhoChiTiet extends Component {


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
    // console.log("state : " + this.props.navigation.state.params.whId);
    
    this.state = {
      isLoaded: false,
      isChartView: false,
      whId: this.props.navigation.state.params.whId,
      whName: this.props.navigation.state.params.whName,
      numberRow: "10",
      year: currentYear,
      month: currentMonth,
      years: years,
    };
  }

  onBtnSwitch(){

    this.setState({
        isChartView: !this.state.isChartView,
    });
  }

  onChangeWarehouse(value) {
    this.setState({
      whId: value
    });
    this.getReportData(value, this.state.numberRow);
  }

  onChangeNumberRow(value) {
    this.setState({
      numberRow: value
    });
    this.getReportData(this.state.whId, value);
  }

  componentWillMount() {
    // let url = MyConst.WS_URL + 'common/warehouse';
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {

    //     this.setState({
    //       isLoaded: true,
    //       warehouses : responseJson});
    //     this.getReportData(this.state.whId, this.state.numberRow);
    //   })
    //   .catch((error) => {
    //     console.log("WS: " + url);
    //     console.log(error);
    //   });

    this.getReportData(this.state.whId, this.state.numberRow);
  }

  getReportData(whId, numberRow) {

    if(!whId)
      whId = 0;

    let url = MyConst.WS_URL + 'report/bctk?type=2&whId=' + whId+'&numberRow='+numberRow;
    fetch(url)
      .then(res => res.json())
      .then(responseJson => {

        let chartData = new Array();
        for(item of responseJson) {
          chartData.push({"v": item.qty, "name": item.product});
        }

        this.setState({
            chartData: [chartData],
            reportData: responseJson});
      })
      .catch(error => {
        console.log("WS: " + url);
        console.log(error);
        this.setState({
            reportData: []});
      });
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
                <Title>Báo cáo Tồn kho chi tiết</Title>
              </Body>
              
            </Header>

            <Grid>
              <Row style={styles.headerParam}> 
                <Card>
                  <CardItem style={styles.cardItem}>
                    <Left>
                      <Text style={[styles.paramText, {flex: 1}]}>Kho</Text>
                    </Left>
                    <Right style={{flex: 3, flexDirection: 'row'}}>
                      <Text>{this.state.whName}</Text>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Left>
                      <Text style={[styles.paramText, {flex: 1}]}>Số hiển thị</Text>
                    </Left>
                    <Body style={{flex: 2, flexDirection: 'row'}}>
                      <Picker
                              mode="dropdown"
                              selectedValue={this.state.numberRow}
                              onValueChange={this.onChangeNumberRow.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={styles.picker}
                            >                           
                           <Item label="10" value="10" />
                           <Item label="20" value="20" />
                           <Item label="50" value="50" />
                           <Item label="100" value="100" />
                           <Item label="--Tất cả--" value="0" />
                        </Picker>
                    </Body>
                    <Right style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>                      
                      <Button bordered rounded small style={{paddingLeft:5, paddingRight:5, marginRight:5}}
                        onPress={() => this.onBtnSwitch()}>
                        <Icon active name="grid" />
                      </Button>  
                    </Right>
                  </CardItem>
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem cardBody>
                  <Body>        
                  { this.state.isChartView? ( 
                      <ScrollView>
                       <ChartBar data={this.state.chartData}/>
                      </ScrollView>
                    ) : (
                    <FlatList
                        data={this.state.reportData}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListHeaderComponent={() => 
                                    <ListItem style={styles.liHeader}>
                                      <Text style={[styles.liTextHeader, {width:"70%"}]}>Sản phẩm</Text>
                                      <Text style={[styles.liTextHeader, {width:"30%", textAlign:"right"}]}>Số lượng</Text>                                      
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
                <Text style={[styles.liText, {width:"70%"}]}>{item.product}</Text>
                <Text style={[styles.liText, {width:"30%", textAlign:"right"}]}>{item.qty.toLocaleString('en')}</Text>
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"70%"}]}>{item.product}</Text>
                <Text style={[styles.liText, {width:"30%", textAlign:"right"}]}>{item.qty.toLocaleString('en')}</Text>
              </ListItem>      
    }
  }  
}

export default BCTonKhoChiTiet;
