
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
          <Body>
            <Title>Đang tải...</Title>
          </Body>
          <Right />
        </Header>
      </Container>
      );
  }	
}

export default EmptyScreen;