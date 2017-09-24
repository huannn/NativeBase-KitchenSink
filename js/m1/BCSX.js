import React, { Component } from "react";
import {AppRegistry,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
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


class BCSanXuat extends Component {


 constructor(props) {
    super(props);

    let currentYear = new Date().getFullYear();
    let years = [];
    for (var i = 2015; i <= currentYear; i++) {
        years.push(i);
    }
    
    this.state = {
      isLoaded: false,
      years: years,
    };    
  }

  onChangeDepartment(value) {
    this.setState({
      dept: value
    });
    this.getReportData(this.state.month, this.state.year, value);
  }

  onChangeMonth(value) {
    this.setState({
      month: value
    });
    this.getReportData(value, this.state.year, this.state.dept);
  }

  onChangeYear(value) {
    this.setState({
      year: value
    });
    this.getReportData(this.state.month, value, this.state.dept);
  }

  componentDidMount() {
    //fetch('https://facebook.github.io/react-native/movies.json')
    fetch(MyConst.WS_URL + 'common/department')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoaded: true,
          departments : responseJson.DataCommon});
      })
      .catch((error) => {
        console.log(error);
      });

      // this.getReportData();
  }

  //reportData: ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho']
  // reportData: [{key: 1, value:'Simon Mignolet'},{key : 2, value:'Nathaniel Clyne'},
  //             {key : 3, value:'Dejan Lovren'},{key : 4, value:'Mama Sakho'},{key : 5, value:'Emre Can'}]

  getReportData(month, year, deptId) {
    let url = MyConst.WS_URL + 'report/bcsx?month=' + month + "&year=" + year + "&deptId=" + deptId;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
            reportData: responseJson.DataReportSX});
      })
      .catch(error => {
        console.log(error);
        this.setState({
            reportData: []});
      });
  };


  _keyExtractor = (item, index) => item.id;
  _renderItem = ({item}) => (
    <Text
      id={item.id}
      title={item}
    />
  );

  render() {

    try {


        if (!this.state.isLoaded) {
          return <EmptyScreen/>
        }

        //let deptItems = Object.keys(this.state.departments).map((key) => {return (<Item label={this.state.departments[key]} value={key} key={key}/>)});
        let deptItems = this.state.departments.map((item) => {return (<Item label={item.name} value={item.id} key={item.id}/>)});
        let monthItems = Object.keys(MyConst.CONST_MONTHS).map((key) => {return (<Item label={MyConst.CONST_MONTHS[key]} value={key} key={key}/>)});
        let yearItems = this.state.years.map((item, index) => {return (<Item label={item} value={item} key={item}/>)});

        return (
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate("DrawerOpen")}
                >
                  <Icon name="ios-menu" />
                </Button>
              </Left>
              <Body>
                <Title>Báo cáo Sản xuất</Title>
              </Body>
              <Right/>
            </Header>

            <Grid>
              <Row style={styles.headerReport}> 
                <Card>
                  <CardItem style={styles.cardItem}>
                    <Left>
                      <Picker
                              mode="dropdown"
                              placeholder="Chọn phòng ban"
                              selectedValue={this.state.dept}
                              onValueChange={this.onChangeDepartment.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={styles.picker}
                            >
                          {deptItems}
                        </Picker>
                    </Left>
                    </CardItem>

                    <CardItem style={styles.cardItem}>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <Picker
                              mode="dropdown"
                              placeholder="Chọn tháng"
                              selectedValue={this.state.month}
                              onValueChange={this.onChangeMonth.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={styles.picker}
                            >
                          {monthItems}
                        </Picker>

                        <Picker
                              mode="dropdown"
                              placeholder="Chọn năm"
                              selectedValue={this.state.year}
                              onValueChange={this.onChangeYear.bind(this)}
                              headerStyle={styles.pickerHeader}
                              headerBackButtonTextStyle={styles.textDefault}
                              headerTitleStyle={styles.textDefault}
                              style={styles.picker}
                            >
                          {yearItems}
                        </Picker>
                    </Left>
                  </CardItem>   
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem style={styles.cardItem}>
                  <Body style={{flex: 1, flexDirection: 'row', width:"100%"}}>
                    <List style={{width:"100%"}}>
                      <ListItem>                        
                        
                          <Text numberOfLines={1} style={[styles.listItemHeader, {width:"35%"}]}>Phòng ban</Text>
                          <Text numberOfLines={1} style={[styles.listItemHeader, {width:"35%"}]}>Sản phẩm</Text>
                          <Text numberOfLines={1} style={[styles.listItemHeader, {width:"15%"}]}>SL lệnh</Text>
                          <Text numberOfLines={1} style={[styles.listItemHeader, {width:"15%"}]}>SL nhập</Text>
                        
                      </ListItem>
                    </List>
                  </Body>  
                </CardItem>
                <CardItem cardBody style={{flex:1}}>
                  <Body style={{flex:1}}>                    
                    <FlatList style={{width:"100%"}}
                        data={this.state.reportData}
                        renderItem={({item}) => 
                                    <ListItem>
                                      <Text numberOfLines={1} style={[styles.listItem, {width:"35%"}]}>{item.department}</Text>
                                      <Text numberOfLines={1} style={[styles.listItem, {width:"35%"}]}>{item.product}</Text>
                                      <Text numberOfLines={1} style={[styles.listItem, {width:"15%"}]}>{item.qtyCommand}</Text>
                                      <Text numberOfLines={1} style={[styles.listItem, {width:"15%"}]}>{item.qtyComplete}</Text>
                                    </ListItem>}
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
}

export default BCSanXuat;
