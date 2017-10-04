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


class BCSanXuat extends Component {


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

  componentWillMount() {
    //fetch('https://facebook.github.io/react-native/movies.json')
    let url = MyConst.WS_URL + 'common/department';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoaded: true,
          departments : responseJson});
        this.getReportData(this.state.month, this.state.year, 0);
      })
      .catch((error) => {
        console.log("WS: " + url);
        console.log(error);
      });
  }

  //reportData: ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho']
  // reportData: [{key: 1, value:'Simon Mignolet'},{key : 2, value:'Nathaniel Clyne'},
  //             {key : 3, value:'Dejan Lovren'},{key : 4, value:'Mama Sakho'},{key : 5, value:'Emre Can'}]

  getReportData(month, year, deptId) {

    if(!month || !year) {
      this.setState({
            reportData: []});
      return;
    }

    if(!deptId)
      deptId = 0;

    let url = MyConst.WS_URL + 'report/bcsx?month=' + month + "&year=" + year + "&deptId=" + deptId;
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

        //let deptItems = Object.keys(this.state.departments).map((key) => {return (<Item label={this.state.departments[key]} value={key} key={key}/>)});
        let deptItems = this.state.departments.map((item) => {return (<Item label={item.name} value={item.id} key={item.id}/>)});
        let monthItems = Object.keys(MyConst.CONST_MONTHS).map((key) => {return (<Item label={MyConst.CONST_MONTHS[key]} value={key} key={key}/>)});
        let yearItems = this.state.years.map((item, index) => {return (<Item label={item} value={item} key={item}/>)});

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
                <Title>Báo cáo Sản xuất</Title>
              </Body>
              
            </Header>

            <Grid>
              <Row style={styles.headerParam}> 
                <Card>
                  <CardItem style={styles.cardItem}>
                    <Left>
                      <Text style={[styles.paramText, {flex: 1}]}>Phòng ban</Text>
                    </Left>
                    <Right style={{flex: 2, flexDirection: 'row'}}>
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
                    </Right>
                  </CardItem>

                  <CardItem style={styles.cardItem}>
                      <Left>
                        <Text style={[styles.paramText, {flex: 1}]}>Tháng, năm</Text>
                      </Left>
                      <Right style={{flex: 2, flexDirection: 'row'}}>
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
                      </Right>
                  </CardItem>   
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem cardBody style={{flex:1}}>
                  <Body style={{flex:1}}>                    
                  <ScrollView horizontal={true}>
                    <FlatList
                        data={this.state.reportData}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListHeaderComponent={() => 
                                    <ListItem style={styles.liHeader}>
                                      <Text style={[styles.liTextHeader, {width:"35%"}]}>Phòng ban</Text>
                                      <Text style={[styles.liTextHeader, {width:"35%"}]}>Sản phẩm</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>SL lệnh</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>SL nhập</Text>
                                    </ListItem>}
                        renderItem={this._renderListItem}
                      >
                    </FlatList>   
                  </ScrollView>
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
                <Text numberOfLines={1} style={[styles.liText, {width:"35%"}]}>{item.department}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"35%"}]}>{item.product}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.qtyCommand}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.qtyComplete}</Text>
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text numberOfLines={1} style={[styles.liText, {width:"35%"}]}>{item.department}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"35%"}]}>{item.product}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.qtyCommand}</Text>
                <Text numberOfLines={1} style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.qtyComplete}</Text>
              </ListItem>      
    }
  }  
}

export default BCSanXuat;
