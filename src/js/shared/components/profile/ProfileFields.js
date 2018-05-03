import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Item, Input } from 'native-base';
import {connect} from "react-redux";
import * as actions from "../../actions/Actions";


const Strings = require('../../res/strings/StringsEN.js');
const Styles = require('../../res/assets/styles/Styles.js');

let user

class ProfileFields extends Component {

    render() {
        if(this.props.responseCodeProfile != null) {
            user = this.props.responseCodeProfile
        }
        return(
            <View style={Styles.profileFields.textFields}>

                <Text style={Styles.profileFields.nameTextField}>{user.firstName} {user.lastName}</Text>
                <Text style={Styles.profileFields.phoneNumberText}>{Strings.PROFILE_PHONE}</Text>
                <Text style={Styles.profileFields.subContentField}>{this.props.phone}</Text>
                <Item style={Styles.profileFields.line}/>

                <Text style={Styles.profileFields.subTitleField}>{Strings.PROFILE_EMAIL}</Text>
                <Text style={Styles.profileFields.subContentField}>{user.username}</Text>
                <Item style={Styles.profileFields.line}/>

                <Text style={Styles.profileFields.subTitleField}>{Strings.PROFILE_ADDRESS}</Text>
                <Text style={[Styles.profileFields.addressSubField,{marginTop:5}]}>{user.addressLine1} {user.addressLine2}</Text>
                <Text style={[Styles.profileFields.addressSubField,{marginTop:2, marginBottom:2}]}>{user.city}, {user.stateId}</Text>
                <Text style={[Styles.profileFields.addressSubField,{marginBottom:20}]}>{user.postalCode}</Text>
                <Item style={[Styles.profileFields.line, {marginBottom:40}]}/>

            </View>
        )

    }
}

function mapStateToProps(state) {
    return{
        responseCodeProfile: state.responseCodeProfile,
        phone: state.phone
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {

    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(ProfileFields)