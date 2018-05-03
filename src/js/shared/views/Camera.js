import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import HeaderAndroid from '../../android/Header.android';
import FooterIos from "../../ios/Footer.ios";
import HeaderIos from "../../ios/Header.ios";
import FabButton from "../../android/FabButton";
import CameraView from "./CameraView";
import CameraWarning from "../components/camera/CameraWarning";

var Strings = require('../res/strings/StringsEN.js');

let footer;
let header;

export default class Camera extends Component {

    render() {
        if(Platform.OS == "ios"){
            footer = <FooterIos navigation={this.props.navigation} activePage={'Camera'}/>
            header = <HeaderIos title={Strings.PAGE_HEADERS_CAMERA}/>
        }
        if(Platform.OS == "android"){
            header =<HeaderAndroid buttonClick={() => this.props.navigation.navigate("DrawerOpen")} title={Strings.PAGE_HEADERS_CAMERA} headerIcon={'menu'}/>
        }
        return(
            <Container>
                {header}
                <CameraWarning navigation={this.props.navigation}/>
                {footer}
            </Container>
        )

    }
}


