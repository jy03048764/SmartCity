import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, List, ListItem } from 'native-base';
import HeaderAndroid from '../../android/Header.android';
import HeaderIos from "../../ios/Header.ios";
import FabButton from "../../android/FabButton";
import FeedbackContent from "../components/FeedbackContent";


var Strings = require('../res/strings/StringsEN.js');

let footer;
let fab;
let header;

export default class Feedback extends Component {

    render() {
        if(Platform.OS == "ios"){
            header = <HeaderIos title={Strings.PAGE_HEADERS_FEEDBACK} targetTextLeft={Strings.HEADER_RETURN}
                                buttonClickLeft={() => this.props.navigation.navigate("Profile")}
            />
        }
        if(Platform.OS == "android"){
            fab = <FabButton/>
            header =<HeaderAndroid buttonClick={() => this.props.navigation.navigate("DrawerOpen")}
                                   title={Strings.PAGE_HEADERS_FEEDBACK} headerIcon={'menu'}
            />
        }
        return(
            <Container>
                {header}
                <Content>

                    <FeedbackContent/>

                </Content>
                {footer}
            </Container>
        )

    }
}