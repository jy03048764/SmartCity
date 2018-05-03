import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Image,
    ImageBackground,
} from 'react-native';

import {  StyleProvider, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Input, Label, Form, Item, Picker } from 'native-base';
import * as actions from "../../actions/Actions";
import {connect} from "react-redux";
import {AsyncStorage} from "react-native";

const Strings = require('../../res/strings/StringsEN.js');
const Style = require('../../res/assets/styles/Styles');
const dimens = Dimensions.get('window').width;

let target;
let button;
let count;

class CreateProfile extends Component {

    proceed(){
        let userObj = {
                        encCode:    this.props.encCode,
                        phone:      this.props.phone,
                        firstName:  this.props.firstName,
                        lastName:   this.props.lastName,
                        email:      this.props.email,
                        address1:   this.props.address1,
                        address2:   this.props.address2,
                        city:       this.props.city,
                        province:   this.props.province,
                        postCode:   this.props.postCode,
                        country:    this.props.country,
                        }
            //console.log(userObj)


        this.props.createUserByPhone(userObj)
    }

    componentDidUpdate(){

        if(this.props.requestObj == null) {
            if (Platform.OS == 'ios') {
                target = "Map"

            }
            if (Platform.OS == 'android') {
                target = "AndroidSideBar"
            }
        }

        if(this.props.requestObj != null) {
            target = "SubmissionDetails"
        }

        if(this.props.responseCodeProfile != null) {
            if ((this.props.responseCodeProfile.errorCode ==0) ) {
                this.props.navigation.navigate(target)
            }
        }
    }

    async storeUserCode(code, phone) {
        try {
            await AsyncStorage.setItem('encCode', code);
            await AsyncStorage.setItem('phone', phone);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }


    render() {

        this.storeUserCode(this.props.encCode, this.props.phone)


        if (this.props.firstName.length !== 0 &&
            this.props.lastName.length !== 0 &&
            this.props.email.length !== 0 &&
            this.props.phone.length !== 0 &&
            this.props.address1.length !== 0 &&
            this.props.city.length !== 0 &&
            this.props.province.length !== 0 &&
            this.props.postCode.length !== 0 &&
            this.props.country.length !== 0) {
            button = <Button transparent onPress={()=>this.proceed()}>
                <Text>Next</Text>
                <Icon name='arrow-forward'/>
            </Button>
        }


        return(
            <ImageBackground style={Style.image.loginBackgroundImage} source={require('../../res/assets/img/smart-city-gradient.png')}>
                <Header style={[Style.header.header,{backgroundColor:'rgba(0,0,0,0)'}]}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Phone')}>
                            <Icon name='arrow-back' />
                            <Text style={{paddingLeft:16, paddingRight:0, width:100}}>{Strings.HEADER_RETURN}</Text>
                        </Button>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        {button}
                    </Right>
                </Header>
        <ScrollView style={{flex:1,height:Dimensions.get('window').height, marginTop:16, }}>

            <KeyboardAvoidingView style={{flex: 1, flexDirection:'column', alignItems:'center'}} behavior="padding">
                <Text style={[Style.text.h1, Style.view.input2]}>{Strings.PAGE_HEADERS_CREATE}</Text>
                <Form style={{flex:0,width: dimens*.84, alignItems:'flex-start'}}>
                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setFirstName(text)} placeholder={Strings.FIELDS_FIRST_NAME}/>
                        </View>
                        <View floatingLabel style={[Style.view.input, Style.view.input2]}>
                        <Input onChangeText={(text)=>this.props.setLastName(text)} placeholder={Strings.FIELDS_LAST_NAME}/>
                        </View>

                        <View floatingLabel keyboardType="numeric" style={Style.view.input}>
                        <Input onChangeText={()=>console.log("Number")} editable={false} value={this.props.phone}/>
                        </View>
                        <View floatingLabel keyboardType='email-address' style={[Style.view.input, Style.view.input2]}>
                        <Input onChangeText={(text)=>this.props.setEmail(text)} placeholder={Strings.FIELDS_EMAIL}/>
                        </View>

                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setAddress1(text)} placeholder={Strings.FIELDS_ADDRESS}/>
                        </View>

                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setAddress2(text)} placeholder={Strings.FIELDS_ADDRESS_LINE2}/>
                        </View>
                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setCity(text)} placeholder={Strings.FIELDS_CITY}/>
                        </View>

                        {/*<View floatingLabel style={Style.view.input}>*/}
                        {/*<Input onChangeText={(text)=>this.props.setProvince(text)} placeholder={Strings.FIELDS_PROVINCE}/>*/}
                        {/*</View>*/}

                        <View floatingLabel style={Style.view.input}>
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                selectedValue={this.props.province}
                                onValueChange={(value)=>this.props.setProvince(value)}
                            >
                                <Item label="Alberta" value="AB" />
                                <Item label="British Coloumbia" value="BC" />
                                <Item label="Manitoba" value="MB" />
                                <Item label="New Brunswick" value="NB" />
                                <Item label="Newfoundland and Labrador" value="NL" />
                                <Item label="Northwest Territories" value="NT" />
                                <Item label="Nova Scotia" value="NS" />
                                <Item label="Nunavut" value="NU" />
                                <Item label="Ontario" value="ON" />
                                <Item label="Prince Edward Island" value="PE" />
                                <Item label="Quebec" value="QC" />
                                <Item label="Saskatchewan" value="Sk" />
                                <Item label="Yukon" value="YT" />
                            </Picker>
                        </View>

                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setPostCode(text)} placeholder={Strings.FIELDS_POSTAL}/>
                        </View>

                        <View floatingLabel style={Style.view.input}>
                        <Input onChangeText={(text)=>this.props.setCountry(text)} placeholder={Strings.FIELDS_COUNTRY}/>
                        </View>

                </Form>
            </KeyboardAvoidingView>
        </ScrollView>
            </ImageBackground>

        )

    }
}

function mapStateToProps(state) {
    return{
        code: state.code,
        encCode: state.encCode,
        phone: state.phone,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        address1: state.address1,
        address2: state.address2,
        city: state.city,
        province: state.province,
        postCode: state.postCode,
        country: state.country,
        responseCodeProfile: state.responseCodeProfile,
        requestObj: state.requestObj,

    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        verificationEntry: (code, phone) => {
            dispatch(actions.verificationEntry(code, phone))
        },
        setCode: (code) => {
            dispatch(actions.setCode(code))
        },
        setFirstName: (text) => {
            dispatch(actions.setFirstName(text))
        },
        setLastName: (text) => {
            dispatch(actions.setLastName(text))
        },
        setEmail: (text) => {
            dispatch(actions.setEmail(text))
        },
        setAddress1: (text) => {
            dispatch(actions.setAddress1(text))
        },
        setAddress2: (text) => {
            dispatch(actions.setAddress2(text))
        },
        setCity: (text) => {
            dispatch(actions.setCity(text))
        },
        setProvince: (text) => {
            dispatch(actions.setProvince(text))
        },
        setPostCode: (text) => {
            dispatch(actions.setPostCode(text))
        },
        setCountry: (text) => {
            dispatch(actions.setCountry(text))
        },
        //create user by phone
        createUserByPhone: (userObj) => {
            dispatch(actions.createUserByPhone(userObj))
        }




    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(CreateProfile)
