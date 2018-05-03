import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Input, Label, Form, Item } from 'native-base';
import {connect} from "react-redux";
import * as actions from "../../actions/Actions";


const Strings = require('../../res/strings/StringsEN.js');
const Style = require('../../res/assets/styles/Styles');
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

let button;
let count = 0;

class Verification extends Component {

    proceed(){
        this.props.verificationEntry(this.props.code, this.props.phone)
    }

    componentDidUpdate(){
        console.log("update")
        if(this.props.responseCode == 0 && count <1){
            count += 1
            this.props.navigation.navigate("CreateProfile")
        }
    }

    render() {
        if (this.props.code.length == 6) {
            button = <Button transparent onPress={() => this.proceed()}>
                <Text>Next</Text>
                <Icon name='arrow-forward'/>
            </Button>
        }

        return(
            <ImageBackground style={Style.image.loginBackgroundImage} source={require('../../res/assets/img/smart-city-gradient.png')}>
                <Header style={[Style.header.header,{backgroundColor:'rgba(0,0,0,0)'}]}>
                        <Button transparent onPress={() => this.props.navigation.navigate('Phone')}>
                            <Icon name='arrow-back'/>
                            <Text style={{paddingLeft:16, paddingRight:0, width:100}}>{Strings.HEADER_RETURN}</Text>
                        </Button>

                    <Right>
                        {button}
                    </Right>
                </Header>
            <KeyboardAvoidingView style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}} behavior="padding">

                        <Text style={Style.text.h1}>{Strings.VERIFICATION_HEADER}</Text>
                        <Text style={Style.text.h2}>{Strings.VERIFICATION_MESSAGE}</Text>

                        <Form style={{
                            flex: 0,
                            width: 350,
                            paddingTop: 15,
                            paddingBottom: 15,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Item inlineLabel style={{width: deviceWidth * 0.8, alignSelf: 'center'}}>
                                <Label style={{color: '#eee'}}>{Strings.FIELDS_CODE}</Label>
                                <Input keyboardType='numeric' style={{color: '#eee'}}
                                       onChangeText={(code) => this.props.setCode(code)} maxLength={6}/>
                            </Item>
                        </Form>
                        <Button transparent style={{alignSelf: 'center', paddingTop: deviceHeight * .15,}}><Text>Didn't
                            get a verification code?</Text></Button>
                    </KeyboardAvoidingView>
                </ImageBackground>
            )

    }
}

function mapStateToProps(state) {
    return{
        phone: state.phone,
        code: state.code,
        encCode: state.encCode,
        responseCode: state.responseCode

    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        verificationEntry: (code, phone) => {
            dispatch(actions.verificationEntry(code, phone))
        },
        setCode: (code) => {
            dispatch(actions.setCode(code))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(Verification)