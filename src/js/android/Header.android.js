import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import * as actions from "../shared/actions/Actions";
import {connect} from 'react-redux';

const Style = require('../shared/res/assets/styles/Styles');

export default class HeaderAndroid extends Component {
    render() {
        return (

                <Header style={Style.header.header} hasTabs={this.props.tabs}>
                    <Left style={Style.header.left}>

                            <Icon style={{color:'#f4f4f4'}} name={this.props.headerIcon} onPress={this.props.buttonClick}/>

                    </Left>
                    <Body>
                    <Title style={Style.header.title}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Right style={Style.header.right}>
                            <Button transparent onPress={this.props.buttonClickRight}>
                                <Text style={{color:'#f4f4f4', textAlign:'center'}} onPress={this.props.buttonClickRight}>
                                    {this.props.targetTextRight}
                                    </Text>
                            </Button>
                        </Right>
                    </Right>
                </Header>

        );
    }
}


