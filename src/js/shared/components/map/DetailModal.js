import React, { Component } from 'react';
import {View, Modal, StyleSheet, Image, Platform, Dimensions, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native';
import * as actions from "../../../shared/actions/Actions";
import {connect} from "react-redux";
import {Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tab, Tabs, List, ListItem, Footer, Segment, Item } from 'native-base';

var Strings = require('../../res/strings/StringsEN');
var Styles = require('../../res/assets/styles/Styles');
var NoImage = require('../../res/assets/img/no-image-available.png');

let arrow;

let serviceName;
let serviceGroup;
let dateSubmitted;
let description;
let status;
let distance;
let address;

let ackIcon;
let buttonText = <Text>{Strings.MAP_MODAL_CANNOT_ACKNOWLEDGE}</Text>;
let image;

let joinedDesc;


class DetailModal extends Component {

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
        if (this.props.storeUserRequests != null && this.props.currentRequest != null) {
            //check if item in ack list for user then set checkbox button accordingly
            if (this.props.storeUserRequests.acknowledge.length > 0) {
                ackIcon = Platform.OS == 'ios' ? "ios-square-outline" : "md-square-outline"
                for (let item in this.props.storeUserRequests.acknowledge) {
                    if (this.props.currentRequest.requestId === this.props.storeUserRequests.acknowledge[item].requestId) {
                        ackIcon = Platform.OS == 'ios' ? "ios-checkbox-outline" : "md-checkbox-outline"
                    }
                }
            }


            if (this.props.currentRequest.requestId != null) {
                buttonText =
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Icon name={ackIcon} style={Styles.map.mapModal.icon}/>
                        <Text style={Styles.map.mapModal.follow}>
                            {Strings.DETAIL_MODAL_ACKNOWLEDGE}{this.props.currentRequest.acknowledgeCount}
                        </Text>
                    </View>

            }
            if (this.props.currentRequest.requestId === null) {
                buttonText = <Text>{Strings.MAP_MODAL_CANNOT_ACKNOWLEDGE}</Text>
            }
        }

        if(Platform.OS == 'android'){
           arrow = <Icon name='arrow-back' style={[Styles.map.mapModal.buttons.backButton, {fontSize:40}]}/>
        }
        if(Platform.OS == 'ios'){
            arrow = <Icon name='arrow-down' style={[Styles.map.mapModal.buttons.backButton, {fontSize:40}]}/>
        }

        if(this.props.currentRequest != null) {
            serviceName = this.props.currentRequest.serviceName
            serviceGroup = this.props.currentRequest.serviceGroup
            dateSubmitted = this.props.currentRequest.dateSubmitted.substr(0,11)
            description = this.props.currentRequest.description
            status = this.props.currentRequest.status
            address = this.props.currentRequest.address

            for(var request in this.props.storeRequests.list){
                if(this.props.storeRequests.list[request].requestIdOpen311 == this.props.currentRequest.requestIdOpen311){
                    distance = this.props.storeRequests.list[request].distance
                }
            }
            if(this.props.loginStatus === true) {
                for (var request in this.props.storeUserRequests.list) {
                    if (this.props.storeUserRequests.list[request].requestId == this.props.currentRequest.requestId) {
                        distance = this.props.storeUserRequests.list[request].distance
                    }
                }
            }

            if(this.props.currentRequest.image == ""){
                image = NoImage
            }
            if(this.props.currentRequest.image != "") {
                image = {uri: this.props.currentRequest.image}
            }

            joinedDesc = <View>
                <Text style={Styles.map.detailModal.text.info}>{description}</Text>
                <Text style={Styles.map.detailModal.text.info}>{this.props.currentRequest.requestId != null? serviceGroup + " / " + serviceName : null}</Text>
            </View>

        }


        return (
            <Modal
                visible={this.props.detailModal}
                animationType={'slide'}
                onRequestClose={this.props.showDetailModal}>

                <ScrollView style={{flexDirection:'column'}}>
                            <View style={{backgroundColor:'black', height:255, zIndex:10, opacity:0.1}} >
                            </View>
                <Image source={image}  style={[Styles.map.detailModal.image,{position:'absolute'}]}/>


                    <Button transparent onPress={this.props.showDetailModal} style={[Styles.map.detailModal.backButton,{zIndex:100}]}>
                        {arrow}
                    </Button>

                <View style={Styles.map.detailModal.infoView}>
                    <Text style ={Styles.map.detailModal.text.header}>{serviceName}</Text>
                    <Text note style ={Styles.map.detailModal.text.note}>{address}</Text>


                </View>

                    <Button block title="follow" style={Styles.map.detailModal.plusOne} onPress={this.updateAck}>
                        {buttonText}
                    </Button>


                <View style={Styles.map.detailModal.detailView}>
                <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DATE}</Text>
                <Text style={Styles.map.detailModal.text.info}>{dateSubmitted}</Text>
                <Item style={Styles.map.detailModal.line}/>

                <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DISTANCE}</Text>
                <Text style={Styles.map.detailModal.text.info}>{distance}</Text>
                <Item style={Styles.map.detailModal.line}/>

                <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_STATUS}</Text>
                <Text style={Styles.map.detailModal.text.info}>{status}</Text>
                <Item style={Styles.map.detailModal.line}/>

                <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DESCRIPTION}</Text>
                    {joinedDesc}
                <Item style={Styles.map.detailModal.line}/>

                </View>
               </ScrollView>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return{
        detailModal: state.detailModal,
        currentRequest: state.currentRequest,
        storeRequests: state.storeRequests,
        responseCodeProfile: state.responseCodeProfile,
        storeUserRequests: state.storeUserRequests,
        loginStatus: state.loginStatus,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        showDetailModal: () => {
            return dispatch(actions.detailModal(false))
        },
        toggleAck: (userId, bool, id311, id ) => {
            dispatch(actions.toggleAck(userId, bool, id311, id ))
        }
    }
};

const shadow = StyleSheet.create({
    icon: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // iOS
        shadowOffset: {
            width: 0,
            height: 1,
        },
    }
});



export default connect(mapStateToProps,mapDistpatchToProps)(DetailModal)