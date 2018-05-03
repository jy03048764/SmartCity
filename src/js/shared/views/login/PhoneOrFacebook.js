import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    Dimensions,
    Text,
    Alert
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Drawer, Input, Label, Form, Item } from 'native-base';


const Strings = require('../../res/strings/StringsEN.js');
const Style = require('../../res/assets/styles/Styles');
const dimension = Dimensions.get('window').width;

let target;

export default class PhoneOrFacebook extends Component {


    exitAlert = () => {
        Alert.alert(
            Strings.ALERT_TITLE,
            Strings.ALERT_MESSAGE,
            [
                {text: Strings.ALERT_NEGATIVE, onPress: ()=> console.log('alert closed'), style:'cancel'},
                {text: Strings.ALERT_POSITIVE, onPress: () => this.props.navigation.navigate('Map') }
            ],
            { cancelable: false }
        )
    };

    render() {
        if(Platform.OS == 'ios'){
            target = "Map"
        }
        if(Platform.OS == 'android'){
            target = "AndroidSideBar"
        }

        return(
           <ImageBackground style={Style.image.loginBackgroundImage} source={require('../../res/assets/img/smart-city-gradient.png')}>
                       <Button transparent onPress={() => this.exitAlert()}>
                           <Icon name='close' style={{fontSize:45}}/>
                       </Button>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Image style={Style.image.icon} source={require('../../res/assets/img/app-icon-sign-up.png')}/>
                <Text style={Style.text.loginH1}>{Strings.PHONE_FACEBOOK_HEADER}</Text>
                <Text style={Style.text.h2}>{Strings.PHONE_FACEBOOK_MESSAGE}</Text>
                <View style={{width: (dimension*.9)}}>
                    <Button light onPress={() => this.props.navigation.navigate('Phone')} title="phoneLogin" style={Style.button.loginButton.phoneButton}>
                        <Text style={[Style.button.loginButton.textPhone, Style.theme.textPhone]}>{Strings.BUTTONS_PHONE}</Text>
                    </Button>
                    <View style={Style.lineBox}>

                        <Item style={Style.line}></Item>
                        <Text style={Style.lineText}>
                            or
                        </Text>
                        <Item style={Style.line}></Item>

                    </View>
                    <Button primary onPress={() => this.props.navigation.navigate(target)} title="facebookLogin" style={Style.button.loginButton.button}>
                        <Icon iconLeft name="logo-facebook" style={Style.button.loginButton.iconFacebook}/>
                        <Text style={Style.button.loginButton.textFacebook}>{Strings.BUTTONS_FACEBOOK}</Text>
                    </Button>

                    <Button transparent title="Login" onPress={() => this.props.navigation.navigate(target)} style={Style.button.loginButton2}>
                        <Text style={Style.text.loginText.already}>{Strings.LOGIN_ALREADY}</Text><Text style={Style.text.loginText.login}>
                        {Strings.LOGIN_LOGIN}
                        </Text>
                    </Button>
                </View>

            </View>
           </ImageBackground>
        )

    }
}