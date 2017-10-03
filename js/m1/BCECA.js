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


class BCECA extends Component {


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
      reportType:"1",
      year: currentYear,
      month: currentMonth,
      years: years,
    };
  }

  onChangeMonth(value) {
    this.setState({
      month: value
    });
    this.getReportData(this.state.reportType, value, this.state.year);
  }

  onChangeYear(value) {
    this.setState({
      year: value
    });
    this.getReportData(this.state.reportType, this.state.month, value);
  }

  onChangeReportType(value) {
    this.setState({
      reportType: value
    });
    this.getReportData(value, this.state.month, this.state.year);
  }

  componentWillMount() {
    
      this.getReportData(this.state.reportType, this.state.month, this.state.year);
  }

  getReportData(reportType, month, year) {

    if(!month || !year) {
      this.setState({
            reportData: []});
      return;
    }

    let url = MyConst.WS_URL + 'report/bceca?type=' + reportType + '&month=' + month + "&year=" + year;
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

        // if (!this.state.isLoaded) {
        //   return <EmptyScreen/>
        // }

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
                <Title>Báo cáo ECA</Title>
              </Body>
              
            </Header>

            <Grid>
              <Row style={styles.headerParam}> 
                <Card>                  
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
                    <FlatList
                        data={this.state.reportData}
                        automaticallyAdjustContentInsets={false}
                        removeClippedSubviews={false}
                        enableEmptySections={true}
                        ListHeaderComponent={() => 
                                    <ListItem style={styles.liHeader}>
                                      <Text style={[styles.liTextHeader, {width:"40%"}]}>Sản phẩm</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>Số lần ECA</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>Tổng số mã</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>Số mã</Text>
                                      <Text style={[styles.liTextHeader, {width:"15%", textAlign:"right"}]}>Tỷ lệ lỗi</Text>
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
                <Text style={[styles.liText, {width:"40%"}]}>{item.product}</Text>                
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.numberECA.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.totalChildren.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.totalChildrenECA.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.rateWrong.toLocaleString('en')}</Text>
              </ListItem> 
    } else {
                                
      return  <ListItem style={styles.liOdd}>
                <Text style={[styles.liText, {width:"40%"}]}>{item.product}</Text>                
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.numberECA.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.totalChildren.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.totalChildrenECA.toLocaleString('en')}</Text>
                <Text style={[styles.liText, {width:"15%", textAlign:"right"}]}>{item.rateWrong.toLocaleString('en')}</Text>
              </ListItem>      
    }
  }  
}

export default BCECA;
