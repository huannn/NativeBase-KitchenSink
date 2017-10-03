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
    for (var i = 2015; i <= currentYear; i++) {
        years.push(i);
    }
    
    this.state = {
      isLoaded: false,
      wh: 0,
      numberRow: "50",
      year: currentYear,
      month: currentMonth,
      years: years,
    };
  }

  onChangeWarehouse(value) {
    this.setState({
      wh: value
    });
    this.getReportData(value, this.state.numberRow);
  }

  onChangeNumberRow(value) {
    this.setState({
      numberRow: value
    });
    this.getReportData(this.state.wh, value);
  }

  // onChangeMonth(value) {
  //   this.setState({
  //     month: value
  //   });
  //   this.getReportData(value, this.state.year, this.state.wh);
  // }

  // onChangeYear(value) {
  //   this.setState({
  //     year: value
  //   });
  //   this.getReportData(this.state.month, value, this.state.wh);
  // }

  componentWillMount() {
    //fetch('https://facebook.github.io/react-native/movies.json')
    let url = MyConst.WS_URL + 'common/warehouse';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoaded: true,
          warehouses : responseJson});
        this.getReportData(0, this.state.numberRow);
      })
      .catch((error) => {
        console.log("WS: " + url);
        console.log(error);
      });
  }

  //reportData: ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho']
  // reportData: [{key: 1, value:'Simon Mignolet'},{key : 2, value:'Nathaniel Clyne'},
  //             {key : 3, value:'Dejan Lovren'},{key : 4, value:'Mama Sakho'},{key : 5, value:'Emre Can'}]

  getReportData(whId, numberRow) {

    if(!whId)
      whId = 0;

    let url = MyConst.WS_URL + 'report/bctk?type=2&whId=' + whId+'&numberRow='+numberRow;
    fetch(url)
      .then(res => res.json())
      .then(responseJson => {
        this.setState({
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

        if (!this.state.isLoaded) {
          return <EmptyScreen/>
        }

        let whItems = this.state.warehouses.map((item) => {return (<Item label={item.name} value={item.id} key={item.id}/>)});

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
                    <Right style={{flex: 2, flexDirection: 'row'}}>
                      <Picker
                              mode="dropdown"
                              placeholder="Chọn kho"
                              selectedValue={this.state.wh}
                              onValueChange={this.onChangeWarehouse.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={styles.picker}
                            >
                          {whItems}
                        </Picker>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Left>
                      <Text style={[styles.paramText, {flex: 1}]}>Dòng hiển thị</Text>
                    </Left>
                    <Right style={{flex: 2, flexDirection: 'row'}}>
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
                    </Right>
                  </CardItem>
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem cardBody>
                  <Body>        
                  
                    <FlatList
                        data={this.state.reportData}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListHeaderComponent={() => 
                                    <ListItem style={styles.liHeader}>
                                      <Text style={[styles.liTextHeader, {width:"40%"}]}>Kho</Text>
                                      <Text style={[styles.liTextHeader, {width:"40%"}]}>Sản phẩm</Text>
                                      <Text style={[styles.liTextHeader, {width:"20%", textAlign:"right"}]}>Số lượng</Text>                                      
                                    </ListItem>}
                        renderItem={this._renderListItem}
                      >
                    </FlatList>                 
                  
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
                <Text style={[styles.liText, {width:"40%"}]}>{item.warehouse}</Text>
                <Text style={[styles.liText, {width:"40%"}]}>{item.product}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.qty.toLocaleString('en')}</Text>
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"40%"}]}>{item.warehouse}</Text>
                <Text style={[styles.liText, {width:"40%"}]}>{item.product}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.qty.toLocaleString('en')}</Text>
              </ListItem>      
    }
  }  
}

export default BCTonKhoChiTiet;
