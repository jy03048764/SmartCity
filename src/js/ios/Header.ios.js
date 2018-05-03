import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


export default class HeaderIos extends Component {
    render() {
        return (
                <Header hasTabs={this.props.tabs}>
                    <Left>
                        <Button transparent onPress={this.props.buttonClickLeft}>
                            <Text>{this.props.targetTextLeft}</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.props.buttonClickRight}>
                            <Text>{this.props.targetTextRight}</Text>
                            {this.props.iconRight}
                        </Button>
                    </Right>
                </Header>
        );
    }
}