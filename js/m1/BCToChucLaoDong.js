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


class BCTaiChinh extends Component {


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
      reportType:"1",
      year: currentYear,
      month: currentMonth,
      years: years,
    };
  }

  onChangeYear(value) {
    this.setState({
      year: value
    });
    this.getReportData(value);
  }

  componentWillMount() {
    
      this.getReportData(this.state.year);
  }

  getReportData(year) {

    if(!year) {
      this.setState({
            reportData: []});
      return;
    }

    let url = MyConst.WS_URL + 'report/bctc2?type=1&year=' + year + '&subType=0';
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

        //let monthItems = Object.keys(MyConst.CONST_MONTHS).map((key) => {return (<Item label={MyConst.CONST_MONTHS[key]} value={key} key={key}/>)});
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
                <Title>Các chỉ số chính</Title>
              </Body>
              
            </Header>

            <Grid>
              <Row style={styles.headerParam}> 
                <Card>                  
                  <CardItem style={styles.cardItem}>
                      <Left>
                        <Text style={[styles.paramText, {flex: 1}]}>Năm</Text>
                      </Left>
                      <Right style={{flex: 2, flexDirection: 'row'}}>
                          
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
                  <CardItem style={styles.cardItem}>
                      <Left>
                        <Text style={[styles.paramText, {flex: 1}]}>Đơn vị tính</Text>
                      </Left>
                      <Right style={{flex: 2, flexDirection: 'row'}}>
                        <Text>Triệu đồng</Text>  
                      </Right>
                  </CardItem>                    
                </Card>
              </Row>
              <Row> 
                <Card>
                <CardItem cardBody style={{flex:1}}>
                  <Body style={{flex:1}}>                    
                      <FlatList
                          data={this.state.reportData}
                          automaticallyAdjustContentInsets={false}
                          removeClippedSubviews={false}
                          enableEmptySections={true}
                          ListHeaderComponent={() => 
                                      <ListItem style={styles.liHeader}>
                                        <Text style={[styles.liTextHeader, {width:"40%"}]}>Nội dung</Text>
                                        <Text style={[styles.liTextHeader, {width:"20%", textAlign:"right"}]}>Năm {this.state.year - 2}</Text>
                                        <Text style={[styles.liTextHeader, {width:"20%", textAlign:"right"}]}>Năm {this.state.year - 1}</Text>
                                        <Text style={[styles.liTextHeader, {width:"20%", textAlign:"right"}]}>Năm {this.state.year}</Text>
                                      </ListItem>}
                          renderItem={
                          ({item, index}) => (
                              index % 2 == 0?  (
                                            <ListItem style={styles.liEven} onPress={() => this._onPressItem(item)}>
                                              <Text style={[styles.liText, {width:"40%"}]}>{item.name}</Text>                
                                              <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value2.toLocaleString('en')}</Text>
                                              <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value1.toLocaleString('en')}</Text>
                                              <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value.toLocaleString('en')}</Text>
                                            </ListItem> 
                                         
                                ) : (
                                                            
                                          <ListItem style={styles.liOdd} onPress={() => this._onPressItem(item)}>
                                            <Text style={[styles.liText, {width:"40%"}]}>{item.name}</Text>                
                                            <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value2.toLocaleString('en')}</Text>
                                            <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value1.toLocaleString('en')}</Text>
                                            <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value.toLocaleString('en')}</Text>
                                          </ListItem>      
                                  
                                )
                          )}
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

  _onPressItem(item){
    
    this.props.navigation.navigate("BCTaiChinhChiTiet", {
                    subType: item.key, 
                    subReportName: item.name,
                    year: this.state.year,
                    value2: item.value2,
                    value1: item.value1,
                    value: item.value});
  };

  _renderListItem({item, index}) {

    if(index % 2 == 0)  {
      return  <ListItem style={styles.liEven}>
                <Text style={[styles.liText, {width:"40%"}]}>{item.name}</Text>                
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value2.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value1.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value.toLocaleString('en')}</Text>
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"40%"}]}>{item.name}</Text>                
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value2.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value1.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"20%", textAlign:"right"}]}>{item.value.toLocaleString('en')}</Text>
              </ListItem>      
    }
  }  
}

export default BCTaiChinh;
