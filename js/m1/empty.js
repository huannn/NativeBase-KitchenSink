
import React, { Component } from "react";
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
} from "native-base";

class EmptyScreen extends Component {

 constructor(props) {
    super(props);
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
            <Title>Loading...</Title>
          </Body>
          <Right />
        </Header>
      </Container>
      );
  }	
}

export default EmptyScreen;