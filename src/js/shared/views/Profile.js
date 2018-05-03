import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    KeyboardAvoidingView, Alert
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, List, ListItem} from 'native-base';
import HeaderAndroid from '../../android/Header.android';
import HeaderIos from "../../ios/Header.ios";
import FabButton from "../../android/FabButton";
import ProfileEditModal from "../components/profile/ProfileEditModal"
import * as actions from "../actions/Actions";
import {connect} from "react-redux";
import ProfileFields from "../components/profile/ProfileFields";
import {AsyncStorage} from "react-native";

const Strings = require('../res/strings/StringsEN.js');
const Styles = require('../res/assets/styles/Styles');

let footer;
let fab;
let header;
let nav;

class Profile extends Component {
    exitAlert = () => {
        Alert.alert(
            "Logout",
            "Are you sure?",
            [
                {text: Strings.ALERT_NEGATIVE, onPress: ()=> console.log('alert closed'), style:'cancel'},
                {text: Strings.ALERT_POSITIVE, onPress: () =>this.processLogout()}
            ],
            { cancelable: false }
        )
    };

    processLogout =()=>{
        this.props.logOut(this.props.responseCodeProfile.userId, this.props.responseCodeProfile.token, this.props.responseCodeProfile.tokenEncryption)
        this.clearUserCode()
        this.props.navigation.navigate('Map')
    }

    async clearUserCode() {
        try {
           // await AsyncStorage.removeItem('encCode');
            await AsyncStorage.removeItem('phone');
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }


    render() {
            if (Platform.OS == "ios") {
                header = <HeaderIos title={Strings.PAGE_HEADERS_PROFILE} targetTextLeft={Strings.HEADER_RETURN}
                                    buttonClickLeft={() => this.props.navigation.navigate("Requests")}
                                    buttonClickRight={() => this.props.modalVisible()}
                                    targetTextRight={Strings.HEADER_EDIT}/>
                nav =
                    <List>
                        <ListItem onPress={() => this.props.navigation.navigate("About")} style={Styles.profileFields.line}>
                            <Text>{Strings.PAGE_HEADERS_ABOUT}</Text>
                        </ListItem>
                        <ListItem onPress={() => this.props.navigation.navigate("Feedback")} style={Styles.profileFields.line}>
                            <Text>{Strings.PAGE_HEADERS_FEEDBACK}</Text>
                        </ListItem>
                    </List>


            }
            if (Platform.OS == "android") {
                fab = <FabButton/>
                header = <HeaderAndroid buttonClick={() => this.props.navigation.navigate("DrawerOpen")}
                                        title={Strings.PAGE_HEADERS_PROFILE} headerIcon={'menu'}
                                        buttonClickRight={() => this.props.modalVisible()}
                                        targetTextRight={Strings.HEADER_EDIT}/>
            }
            return (
                <Container>
                    {header}
                    <Content>

                        <ProfileEditModal/>

                        <ProfileFields/>

                        {nav}

                        <Button  onPress={this.exitAlert} style={Styles.button.logout.button}>
                            <Text style={Styles.button.logout.text}>{Strings.BUTTONS_LOGOUT}</Text>
                        </Button>

                    </Content>
                    {footer}
                </Container>
            )

        }

}

function mapStateToProps(state) {
    return{
        responseCodeProfile: state.responseCodeProfile,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        modalVisible: () => {
            return dispatch(actions.editModal(true))
        },
        logOut: (userId, token, tokenEncryption) => {
            return dispatch(actions.logOut(userId, token, tokenEncryption))
        },
        updateLoginStatus: () => {
            return dispatch(actions.logOut(false))
        }
    }
}




export default connect(mapStateToProps,mapDistpatchToProps)(Profile)

