import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, List, ListItem, Item} from 'native-base';
import * as actions from "../../actions/Actions";
import {connect} from "react-redux";
import {distanceLoaded} from "../../actions/Actions";


const Strings = require('../../res/strings/StringsEN.js');
const Styles = require('../../res/assets/styles/Styles');
const NoImage = require('../../res/assets/img/no-image-available.png');

let serviceName;
let serviceGroup;
let dateSubmitted;
let description;
let status;
let distance;
let address;
let ackIcon;
let buttonText;

class RequestDetail extends Component {

    updateAck = () => {
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
                this.props.toggleAck(this.props.responseCodeProfile.userId, true,this.props.currentRequest.requestIdOpen311, this.props.currentRequest.requestId)
            }
        }
        if (this.props.storeUserRequests.acknowledge.length === 0) {
            console.log(this.props.currentRequest.requestId)
            this.props.toggleAck(this.props.responseCodeProfile.userId, true, this.props.currentRequest.requestIdOpen311, this.props.currentRequest.requestId)
        }

    }




    render() {

        if (this.props.currentRequest != null) {


            serviceName = this.props.currentRequest.serviceName
            serviceGroup = this.props.currentRequest.serviceGroup
            dateSubmitted = this.props.currentRequest.dateSubmitted.substr(0,11)
            description = this.props.currentRequest.description
            status = this.props.currentRequest.status
            address = this.props.currentRequest.address

            if(this.props.currentRequest.image == ""){
                image = NoImage
            }
            if(this.props.currentRequest.image != "") {
                image = {uri: this.props.currentRequest.image}
            }

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
                buttonText = <Text>{Strings.MAP_MODAL_CANNOT_ACKNOWLEDGE}</Text>
            }

            return (
                <View>
                    <Image source={image}
                           style={Styles.map.detailModal.image}/>

                    <Button style={Styles.map.detailModal.plusOne} disabled={this.props.currentRequest.requestId === null? true : false} onPress={this.updateAck}>
                        {buttonText}
                    </Button>

                    <View style={Styles.map.detailModal.detailView}>
                        <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DATE}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{dateSubmitted}</Text>
                        <Item style={Styles.map.detailModal.line}/>
                        <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DISTANCE}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{distance}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{address}</Text>
                        <Item style={Styles.map.detailModal.line}/>
                        <Text note style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_STATUS}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{status}</Text>
                        <Item style={Styles.map.detailModal.line}/>
                        <Text note
                              style={Styles.map.detailModal.text.infoNote}>{Strings.DETAIL_MODAL_DESCRIPTION}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{description}</Text>
                        <Text style={Styles.map.detailModal.text.info}>{this.props.currentRequest.requestId != null? serviceGroup + " / " + serviceName : null}</Text>
                        <Item style={Styles.map.detailModal.line}/>
                    </View>
                </View>
            )

        }
    }
}

function mapStateToProps(state) {
    return{
        storeRequests: state.storeRequests,
        detailRequest: state.detailRequest,
        responseCodeProfile: state.responseCodeProfile,
        storeUserRequests: state.storeUserRequests,
        currentRequest: state.currentRequest,
        loginStatus: state.loginStatus
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        modalVisible: () => {
            return dispatch(actions.editModal(true))
        },
        toggleAck: (userId, bool, id311, id ) => {
            dispatch(actions.toggleAck(userId, bool, id311, id ))
        },


    }
}




export default connect(mapStateToProps,mapDistpatchToProps)(RequestDetail)