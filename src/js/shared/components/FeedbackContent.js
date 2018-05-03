import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, List, ListItem, Item, Input } from 'native-base';



const Strings = require('../res/strings/StringsEN.js');
const Styles = require('../res/assets/styles/Styles');

let ackIcon = Platform.OS == 'ios' ? "ios-square-outline" : "md-square-outline"

export default class FeedbackContent extends Component {

    render() {
        return(
            <View style={Styles.feedbackContent.view}>
                <Item regular>
                <TextInput style={Styles.feedbackContent.input} placeholder='Type Feedback Here' onChange={()=>console.log("FeebackBox Inputted")} multiline={true} maxLength={1024}  autogrow={true}/>

                </Item>
                <Button style={Styles.feedbackContent.submitButton}><Text style={Styles.feedbackContent.submitButtonText}>{Strings.BUTTONS_SUBMIT}</Text></Button>

            </View>
        )

    }
}