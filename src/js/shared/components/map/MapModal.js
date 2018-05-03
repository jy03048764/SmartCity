import React, { Component } from 'react';
import {View, Modal, StyleSheet, Image, Platform, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import * as actions from "../../../shared/actions/Actions"
import {connect} from "react-redux";
import {Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tab, Tabs, List, ListItem, Footer, Segment } from 'native-base';

const Strings = require('../../res/strings/StringsEN');
const Styles = require('../../res/assets/styles/Styles');
var NoImage = require('../../res/assets/img/no-image-available.png');

let modalSpaceHeight;
let serviceName;
let serviceGroup;

let ackIcon;
let buttonText;
let image;

class MapModal extends Component {

    updateAck = () => {
        if(this.props.loginStatus === true) {
            if (this.props.storeUserRequests.acknowledge.length > 0) {
                let inList = false;
                for (let item in this.props.storeUserRequests.acknowledge) {
                    //if item is in ack list for user toggle to false on press
                    if (this.props.currentRequest.requestId === this.props.storeUserRequests.acknowledge[item].requestId) {
                        console.log(this.props.currentRequest.requestId + "  :  " + item.requestId)
                        inList = true
                        this.props.toggleAck(this.props.responseCodeProfile.userId, false, this.props.storeUserRequests.acknowledge[item].requestIdOpen311, this.props.storeUserRequests.acknowledge[item].requestId)
                    }
                }
                //if if loops through user ack list and request is not present, ack it
                if (inList == false) {
                    this.props.toggleAck(this.props.responseCodeProfile.userId, true, this.props.currentRequest.requestIdOpen311, this.props.currentRequest.requestId)
                }
            }
            if (this.props.storeUserRequests.acknowledge.length === 0) {
                console.log(this.props.currentRequest.requestId)
                this.props.toggleAck(this.props.responseCodeProfile.userId, true, this.props.currentRequest.requestIdOpen311, this.props.currentRequest.requestId)
            }
        }

    }

    render() {
        if(this.props.currentRequest != null) {
        //check if item in ack list for user then set checkbox button accordingly
            if(this.props.loginStatus === true) {
                if (this.props.storeUserRequests.acknowledge.length > 0) {
                    ackIcon = Platform.OS == 'ios' ? "ios-square-outline" : "md-square-outline"
                    for (let item in this.props.storeUserRequests.acknowledge) {
                        if (this.props.currentRequest.requestId === this.props.storeUserRequests.acknowledge[item].requestId) {
                            ackIcon = Platform.OS == 'ios' ? "ios-checkbox-outline" : "md-checkbox-outline"
                        }
                    }
                }
            }

        //console.log(this.props.currentRequest)
        if(this.props.currentRequest.requestId != null){
            buttonText =
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Icon name={ackIcon} style={Styles.map.mapModal.icon}/>
                    <Text style={Styles.map.mapModal.follow}>
                        {Strings.DETAIL_MODAL_ACKNOWLEDGE}{this.props.currentRequest.acknowledgeCount}
                    </Text>
                </View>
        }
        if(this.props.currentRequest.requestId === null){
            buttonText = <Text style={Styles.map.mapModal.buttons.text}>{Strings.DETAIL_MODAL_ACKNOWLEDGE}</Text>
        }

            serviceName = this.props.currentRequest.serviceName
            serviceGroup = this.props.currentRequest.serviceGroup

            if(this.props.currentRequest.image == ""){
                image = NoImage
            }
            if(this.props.currentRequest.image != "") {
                image = {uri: this.props.currentRequest.image}
            }
        }


        if(Platform.OS == 'android'){
            if(Dimensions.get('window').height<=700) {
                modalSpaceHeight = Dimensions.get('window').height-168
            }
            if(Dimensions.get('window').height>700) {
                modalSpaceHeight = Dimensions.get('window').height-168
            }

        }
        if(Platform.OS == 'ios'){
            if(Dimensions.get('window').height<=700) {
                modalSpaceHeight = Dimensions.get('window').height-199
            }
            if(Dimensions.get('window').height>700) {
                modalSpaceHeight = Dimensions.get('window').height-199
            }
        }

        return (
            <Modal
                visible={this.props.mapModal}
                animationType={'slide'}
                onRequestClose={this.props.showMapModal}
                transparent={true}>
                <TouchableOpacity onPress={this.props.showMapModal}>

                    <TouchableWithoutFeedback>
                <View style={{height:144, width:Dimensions.get('window').width,
                    marginTop:modalSpaceHeight, backgroundColor:'white'}}>

                    <View style={{flexDirection:'row', height:100,backgroundColor:'white' }}>
                    <Thumbnail large square source={image} style={Styles.map.mapModal.thumbnail} />

                        <View style={Styles.map.mapModal.textView}>
                        <Text style={Styles.map.mapModal.text.title}>{serviceGroup}</Text>
                        <Text note style={Styles.map.mapModal.text.note}>{serviceName}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row', height:44,backgroundColor:'white'}}>
                        <Button block title={"moreInfo"}
                                onPress={this.props.toggleModals}
                                style={Styles.map.mapModal.buttons.moreInfo}>
                            <Text>{Strings.MAP_MODAL_MORE_INFO_BUTTON}</Text>
                        </Button>
                        <Button block success title={"follow"}//change to warning on press
                                onPress={this.updateAck}
                                style={Styles.map.mapModal.buttons.plusOne}>
                            {buttonText}
                        </Button>
                    </View>

                </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>


            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return{
        mapModal: state.mapModal,
        currentRequest: state.currentRequest,
        responseCodeProfile: state.responseCodeProfile,
        storeUserRequests: state.storeUserRequests,
        loginStatus: state.loginStatus

    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        showMapModal: () => {
            return dispatch(actions.mapModal(false))
        },
        showDetailModal: () => {
            return dispatch(actions.detailModal(true))
        },
        toggleModals: () => {
            return dispatch(actions.toggleModals())
        },
        toggleAck: (userId, bool, id311, id ) => {
            dispatch(actions.toggleAck(userId, bool, id311, id ))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(MapModal)