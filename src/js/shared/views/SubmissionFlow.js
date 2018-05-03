import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import SubmissionDetails from "./SubmissionDetails";
import * as actions from "../actions/Actions";
import {connect} from "react-redux";

var Strings = require('../res/strings/StringsEN.js');



//TODO: add issue submission confirmation alert




class SubmissionFlow extends Component {

    render() {
        console.log(this.props.imageSource);
        return(
            <Content>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'column',
                    }}>
                    <Image
                        style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}
                        source={{uri: 'data:image/png;base64,'+ this.props.imageSource.base64 }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignSelf: 'flex-start',
                            }}
                            onPress={()=>this.props.navigation.navigate('CameraView')}>
                            <Icon name={"close"} style={{fontSize:56, color:"white", paddingLeft:16}}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignSelf: 'flex-end',
                                justifyContent:'flex-end',
                            }}
                            onPress={()=>this.props.navigation.navigate('SubmissionDetails')}>
                            <Icon name={"ios-checkmark-circle"} style={{fontSize:96, color:"white", paddingRight:16}}/>
                        </TouchableOpacity>
                    </Image>
                </View>
            </Content>
        )
    }
}

function mapStateToProps(state) {
    return{
        imageSource: state.photoCached,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        cachePhoto: (obj) => {
            return dispatch(actions.cachePhoto(obj))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(SubmissionFlow)