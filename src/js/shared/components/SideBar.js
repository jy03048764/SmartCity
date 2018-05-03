import React from "react";
import { AppRegistry, Image, StatusBar, Platform, View, TouchableOpacity } from "react-native";
import {
    Button,
    Text,
    Container,
    List,
    ListItem,
    Content,
    Icon,
    Left,
    Thumbnail
} from "native-base";
import {routesAndroid} from "../NavItems";
import {connect} from "react-redux";
import * as actions from "../actions/Actions";

var Strings = require('../res/strings/StringsEN.js');

let target;
let name;

class SideBar extends React.Component {

    handleOnPress(route){
        this.props.navigation.navigate(route);
    }


    render() {

        if(this.props.responseCodeProfile == null) {
            target = 'PhoneOrFacebook'
            name = "Tap to login"
        }
        if(this.props.responseCodeProfile!= null){
            target = 'Profile'
            name = this.props.firstName + " " + this.props.lastName
        }

        return (
            <Container>
                <Content>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(target)}>

                    <View style={{backgroundColor:'#3F51B5' ,height:160,flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-end'}}>
                        <Text style={{color:'white', paddingBottom:16,paddingLeft:8, fontSize:24}}>
                            {name}
                        </Text>
                        {/*<Text style={{color:'white', paddingBottom:16,paddingLeft:8, fontSize:12}}>John.Smith@Address.ca</Text>*/}
                    </View>
                    </TouchableOpacity>
                    <List
                        dataArray={routesAndroid}
                        contentContainerStyle={{ marginTop: 16 }}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.handleOnPress(data.route)}
                                    style={{borderBottomWidth: 0}}>
                                    <Left>
                                        <Icon active name={data.icon} style={{color: "#777", fontSize: 26, width: 30}}/>
                                        <Text>
                                            {data.name}
                                        </Text>
                                    </Left>
                                </ListItem>
                            );
                        }}
                    />
                </Content>
            </Container>
        );
    }
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

    }
}

export default connect(mapStateToProps,mapDistpatchToProps)(SideBar)