
import React, { Component } from "react";
import {AsyncStorage} from 'react-native';
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
  Text,
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import styles from "./styles";
import * as MyConst from './const.js';

class Logout extends Component {

 constructor(props) {
    super(props);
  }

  onBtnPress(){
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }

  render() {
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
            <Title>Đăng xuất</Title>
          </Body>
          <Right />
        </Header>
        <Grid>
          <Row style={styles.headerParam}> 
            <Card>                  
              <CardItem style={styles.cardItem}>
                  <Left>
                    
                  </Left>
                  <Right style={{flex: 2, flexDirection: 'row', justifyContent:'center'}}>
                      
                      <Button style={{marginTop:5}}
                        onPress={() => this.onBtnPress()}>
                        <Text>Đăng xuất</Text>
                      </Button>
                  </Right>
              </CardItem> 
            </Card>
          </Row>
              
        </Grid>
      </Container>
      );
  }	
}

export default Logout;