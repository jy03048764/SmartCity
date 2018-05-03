import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Thumbnail, List, ListItem, Segment } from 'native-base';
import HeaderAndroid from '../../android/Header.android';
import FooterIos from "../../ios/Footer.ios";
import HeaderIos from "../../ios/Header.ios";
import FabButton from "../../android/FabButton";
import RequestList from "../../shared/components/requests/RequestList";
import * as actions from "../actions/Actions";
import {connect} from "react-redux";

const Strings = require('../res/strings/StringsEN.js');
const Style = require('../res/assets/styles/Styles');
let footer;
let fab;
let header;
let target;

class Requests extends Component {


    render() {
       // console.log(this.props.responseCodeProfile);
        (this.props.responseCodeProfile == null || this.props.loginStatus == false)? target = 'PhoneOrFacebook' : target = 'Profile'

        if(Platform.OS === "ios"){
            footer = <FooterIos navigation={this.props.navigation} activePage={'Requests'}/>
            header = <HeaderIos title={Strings.PAGE_HEADERS_REQUESTS}  iconRight={<Icon name='ios-contact'/>} buttonClickRight={()=>this.props.navigation.navigate(target)} tabs={true}/>
        }
        if(Platform.OS == "android"){
            fab = <FabButton navigation={this.props.navigation}/>
            header =<HeaderAndroid buttonClick={() => this.props.navigation.navigate("DrawerOpen")} title={Strings.PAGE_HEADERS_REQUESTS} headerIcon={'menu'}/>
        }
        return(
            <Container>
                <View>
                {header}
                    <Segment>
                        <Button first active={this.props.filterSegment[0]} onPress={()=>this.props.filterSegmentToggle(1)} style={Style.segment.button}>
                            <Text style={Style.segment.text} >{Strings.REQUEST_SEGMENT_PUBLIC}</Text>
                        </Button>
                        <Button active={this.props.filterSegment[1]} onPress={()=>this.props.filterSegmentToggle(2)} style={Style.segment.button}>
                            <Text style={Style.segment.text}>{Strings.REQUEST_SEGMENT_PERSONAL}</Text>
                        </Button>
                        <Button last active={this.props.filterSegment[2]} onPress={()=>this.props.filterSegmentToggle(3)} style={Style.segment.button}>
                            <Text style={Style.segment.text}>{Strings.REQUEST_SEGMENT_ACKNOWLEDGED}</Text>
                        </Button>
                    </Segment>
                </View>
                <Content>
                    <RequestList filter={this.props.filterSegment} navigation={this.props.navigation}/>
                </Content>
                {fab}
                {footer}
            </Container>
        )

    }
}


function mapStateToProps(state) {
    return{
        filterSegment: state.filterSegment,
        responseCodeProfile: state.responseCodeProfile,
        storeUserRequests: state.storeUserRequests,
        loginStatus: state.loginStatus

    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        filterSegmentToggle: (int) => {
            return dispatch(actions.filterSegmentToggle(int))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(Requests)