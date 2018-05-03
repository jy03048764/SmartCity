import React, {Component} from 'react';
import {View, Modal, StyleSheet, Image, Platform, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Picker} from 'native-base';
import * as actions from "../../../shared/actions/Actions"
import {connect} from "react-redux";
import {headerTheme} from "../../../../../native-base-theme/components/Header"
import {
    Title,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Tab,
    Tabs,
    List,
    ListItem,
    Footer,
    Segment,
    Form,
    Item,
    Label,
    Input,
    StyleProvider
} from 'native-base';


const Strings = require('../../res/strings/StringsEN.js');
const Styles = require('../../res/assets/styles/Styles');
class ProfileEditModal extends Component {

    save = () => {
        let userObj = {
            userId:     this.props.responseCodeProfile.userId,
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
            token: this.props.responseCodeProfile.token,
            tokenEncryption:this.props.responseCodeProfile.tokenEncryption,
        }
        //console.log(userObj)

        this.props.toggleModal()
        this.props.updateUser(userObj)

    }


    render() {
        return (

                <Modal
                    visible={this.props.editModal}
                    animationType={'slide'}
                    onRequestClose={this.props.toggleModal}>
                    {/*<View style={{flexDirection:'row', backgroundColor:'#1c4888', height: 56}}>*/}
                        {/*<Button style={{flex:1.5}} transparent onPress={this.props.toggleModal}>*/}
                            {/*<Text style={{color:'#f4f4f4', fontSize:16}}>{Strings.BUTTONS_CANCEL}</Text>*/}
                        {/*</Button>*/}
                        {/*<Title style={{flex:3, alignSelf:'center'}}>{Strings.PAGE_HEADERS_EDIT}</Title>*/}
                        {/*<Button style={{flex:1.5}} transparent onPress={this.props.toggleModal}>*/}
                            {/*<Text style={{color:'#f4f4f4'}}>{Strings.BUTTONS_DONE}</Text>*/}
                        {/*</Button>*/}
                    {/*</View>*/}
                    <Header style={Styles.header.header}>
                        <Left style={Styles.header.left}>
                                <Text style={Styles.header.text} onPress={this.props.toggleModal}>{Strings.BUTTONS_CANCEL}</Text>
                        </Left>
                        <Body>
                        <Title style={Styles.header.title}>{Strings.PAGE_HEADERS_EDIT}</Title>
                        </Body>
                        <Right style={Styles.header.right}>
                                <Text style={Styles.header.text} onPress={this.save}>{Strings.BUTTONS_DONE}</Text>
                        </Right>
                    </Header>

                    <Content>
                        <KeyboardAvoidingView style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}} behavior="padding">
                        <Form style={{
                            flex: 1,
                            width: 350,
                            paddingTop: 88,
                            paddingBottom: 48,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Item inlineLabel style={Styles.profileEditModal.firstNameField}>
                                <Label>{Strings.FIELDS_FIRST_NAME}</Label>
                                <Input onChangeText={(text) => this.props.setFirstName(text)} value={this.props.firstName}/>
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.lastNameField}>
                                <Label>{Strings.FIELDS_LAST_NAME}</Label>
                                <Input onChangeText={(text) => this.props.setLastName(text)} value={this.props.lastName}/>
                            </Item>
                            <Item inlineLabel keyboardType='phone-pad' style={Styles.profileEditModal.phoneField}>
                                <Label>{Strings.FIELDS_PHONE}</Label>
                                <Input  editable={false} onChangeText={() => console.log("Phone")} value={this.props.phone}/>
                            </Item>
                            <Item inlineLabel keyboardType='email-address' style={Styles.profileEditModal.emailField}>
                                <Label>{Strings.FIELDS_EMAIL}</Label>
                                <Input onChangeText={(text) => this.props.setEmail(text)} value={this.props.email}/>
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.addressLineField}>
                                <Label>{Strings.FIELDS_ADDRESS}</Label>
                                <Input onChangeText={(text) => this.props.setAddress1(text)} value={this.props.address1}/>
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.addressLineSubField}>
                                <Label>{Strings.FIELDS_ADDRESS_LINE2}</Label>
                                <Input onChangeText={(text) => this.props.setAddress2(text)} value={this.props.address2}/>
                            </Item>
                            <Item inlineLabel Label style={Styles.profileEditModal.addressLineSubField}>
                                <Label>{Strings.FIELDS_POSTAL}</Label>
                                <Input onChangeText={(text) => this.props.setPostCode(text)} value={this.props.postCode}/>
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.addressLineSubField}>
                                <Label>{Strings.FIELDS_CITY}</Label>
                                <Input onChangeText={(text) => this.props.setCity(text)} value={this.props.city}/>
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.addressLineSubField}>
                                <Label>{Strings.FIELDS_PROVINCE}</Label>
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
                            </Item>
                            <Item inlineLabel style={Styles.profileEditModal.addressLineSubField}>
                                <Label>{Strings.FIELDS_COUNTRY}</Label>
                                <Input onChangeText={(text) => this.props.setCountry(text)} value={this.props.country}/>
                            </Item>
                        </Form>
                        </KeyboardAvoidingView>
                    </Content>

                </Modal>
                )}
}


function mapStateToProps(state) {
    return{
        responseCodeProfile: state.responseCodeProfile,
        phone: state.phone,
        editModal: state.editModal,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        address1: state.address1,
        address2: state.address2,
        city: state.city,
        province: state.province,
        postCode: state.postCode,
        country: state.country,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        toggleModal: () => {
            dispatch(actions.editModal(false))
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
        updateUser: (userObj) => {
            dispatch(actions.updateUser(userObj))
        }
    }
}

export default connect(mapStateToProps,mapDistpatchToProps)(ProfileEditModal)