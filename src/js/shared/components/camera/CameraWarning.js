import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';

var Strings = require('../../res/strings/StringsEN.js');
var Styles = require('../../res/assets/styles/Styles');


export default class CameraWarning extends Component {

    render() {

        return(
            <Content>
                <View style={Styles.cameraWarning.centerView}>
                    <Text style={Styles.cameraWarning.textFieldTitle}>{Strings.CAMERA_WARNING}</Text>
                    <Text style={Styles.cameraWarning.textField}>{Strings.CAMERA_WARNING_MESSAGE}</Text>
                    <Button style={Styles.cameraWarning.buttonField} onPress={()=>this.props.navigation.navigate("CameraView")}>
                        <Text style={Styles.cameraWarning.buttonText}>{Strings.BUTTONS_OK}</Text>
                    </Button>
                </View>
            </Content>
        )
    }
}