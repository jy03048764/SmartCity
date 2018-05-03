import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    TouchableOpacity, Dimensions, Alert
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Spinner } from 'native-base';
import * as actions from "../actions/Actions";
import {connect} from "react-redux";
import HeaderAndroid from '../../android/Header.android';
import FooterIos from "../../ios/Footer.ios";
import HeaderIos from "../../ios/Header.ios";
import Details from "../components/submission/Details";

var Strings = require('../res/strings/StringsEN.js');


class SubmissionDetails extends Component {

    exitAlert = () => {
        Alert.alert(
            Strings.ALERT_TITLE,
            Strings.ALERT_MESSAGE,
            [
                {text: Strings.ALERT_NEGATIVE, onPress: ()=> console.log('alert closed'), style:'cancel'},
                {text: Strings.ALERT_POSITIVE, onPress: () => this.props.navigation.navigate('Camera') }
            ],
            { cancelable: false }
        )
    }


    render() {
        if(Platform.OS == "ios"){
            header = <HeaderIos title={Strings.PAGE_HEADERS_DETAIL} buttonClickLeft={this.exitAlert} targetTextLeft={Strings.HEADER_CANCEL}/>
        }
        if(Platform.OS == "android"){
            header =<HeaderAndroid buttonClick={this.exitAlert} title={Strings.PAGE_HEADERS_DETAIL} headerIcon={'close'}/>
        }
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'column',
                }}>
                {header}
                <Content>

                    <Details navigation={this.props.navigation}/>

                </Content>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        imageSource: state.photoCached,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        cachePhoto: (obj) => {
            return dispatch(actions.cachePhoto(obj))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(SubmissionDetails)