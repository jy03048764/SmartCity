import React, { Component } from 'react';
import {View,Modal, StyleSheet, Image, Platform, Dimensions} from 'react-native';
import * as actions from "../../../shared/actions/Actions"
import {connect} from "react-redux";
import {Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tab, Tabs, List, ListItem, Footer, Segment, Spinner } from 'native-base';
import RequestListItem from "./RequestListItem";

let filterValues;
let placeholder;
let pleaseLogIn;
let messageView;
let list;


class RequestList extends Component {

    render() {
        messageView =
            <View>
                <Text>Please log in to display info here</Text>
                <Button onPress={()=>this.props.navigation.navigate("PhoneOrFacebook")}><Text>Login</Text></Button>
            </View>

        filterValues = this.props.filter; //object that is [Bool,bool,bool]

        if (filterValues[0] == true) {
            placeholder = this.props.storeRequests.list
            pleaseLogIn = null
        }
        if (filterValues[1] == true) {
            if(this.props.loginStatus === true) {
                placeholder = this.props.storeUserRequests.list
                pleaseLogIn = null
            }else{
                placeholder = null
                pleaseLogIn = messageView
            }
        }
        if (filterValues[2] == true) {
            if(this.props.loginStatus === true) {
                placeholder = this.props.storeUserRequests.acknowledge
                pleaseLogIn = null
            }else{
                placeholder = null
                pleaseLogIn = messageView
            }
        }

        if(this.props.distanceLoaded == false){
            return(
                <Spinner color='blue' />
            )

        }

        if(placeholder != null){
            list = Object.keys(placeholder).map(function (item, i) {
                return (
                    <RequestListItem key={i} {...placeholder[item]}
                                     title={placeholder[item].serviceName}
                                     navigation={this.props.navigation}
                                     date={placeholder[item].dateSubmitted}
                                     distance={placeholder[item].distance}
                                     wholeObj={placeholder[item]}
                                     image={placeholder[item].image}
                    />
                )

            }.bind(this))
        }

        if(this.props.distanceLoaded == true) {
            if (placeholder != null && Object.keys(placeholder).length > 0) {
                return (
                    <List>
                        {list}
                    </List>
                )
            }
            if(placeholder != null && Object.keys(placeholder).length == 0){
                return(
                    <Text>Nothing to show</Text>
                )
            }
            if(placeholder == null) {
                return pleaseLogIn
            }
        }


    }
}

function mapStateToProps(state) {
    return{
        storeRequests: state.storeRequests,
        userLocation: state.mapRegion,
        distanceLoaded: state.distanceLoaded,
        storeUserRequests: state.storeUserRequests,
        loginStatus:state.loginStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        calculateDistance: (userLoc,requestList,) => {
            dispatch(actions.calculateDistance(userLoc, requestList))
        },

    }
};



export default connect(mapStateToProps,mapDispatchToProps)(RequestList)