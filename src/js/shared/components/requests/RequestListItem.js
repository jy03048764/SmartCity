import React, { Component } from 'react';
import {View,Modal, StyleSheet, Image, Platform, Dimensions} from 'react-native';
import * as actions from "../../../shared/actions/Actions"
import {connect} from "react-redux";
import {Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tab, Tabs, List, ListItem, Footer, Segment } from 'native-base';

let arrow;
const Style = require('../../res/assets/styles/Styles');
var NoImage = require('../../res/assets/img/no-image-available.png');

let image;
class RequestListItem extends Component {
    clicked = () => {
        this.props.currentRequest(this.props.wholeObj)
        this.props.navigation.navigate('RequestListDetail')
    }



    render() {
        if(Platform.OS == "ios"){
           arrow = <Icon name="ios-arrow-forward" style={Style.requests.icon} />
        }
        if(Platform.OS == "android"){
           arrow = <Icon name="md-arrow-forward" style={Style.requests.icon}/>
        }

        if(this.props.image == ""){
            image = NoImage
        }
        if(this.props.image != "") {
            image = {uri: this.props.image}
        }

        return (
            <List>
                <ListItem thumbnail onPress={()=>this.clicked()} >
                    <Left>
                    <Thumbnail square size={80} source={image} />
                    </Left>
                    <Body>
                        <Text style={Style.requests.text}>{this.props.title}</Text>
                        <Text note style={Style.requests.note}>{this.props.distance} - {this.props.date.slice(0,10)} </Text>
                    </Body>
                    <Right>{arrow}</Right>
                </ListItem>
            </List>
        );
    }
}

function mapStateToProps(state) {
    return{

    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        currentRequest: (obj) => {
            dispatch(actions.currentRequest(obj))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(RequestListItem)