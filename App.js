import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Root, StyleProvider, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import Expo from 'expo'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import stocksApp from "./src/js/shared/reducers/Reducers";

import {AppRouteAndroid, AppRouteIos, AppRoute, AppNavigator, LoginFlow} from "./src/js/shared/NavItems";
import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform';


let state = {
    photoCached: {},
    editModal: false,
    mapModal: false,
    detailModal: false,
    filterSegment:[true,false,false],
    mapRegion:null,
    storeRequests:null,
    storeUserRequests:null,
    storeServices:null,
    actionSheetValue: 0,
    services:[],
    distanceLoaded: false,
    currentRequest:null,
    detailRequest:null,
    phone:"",
    code:0,
    responseCode:null,
    responseCodeProfile:null,
    encCode:"",
    //user
    firstName:"",
    lastName:"",
    email:"",
    address1:"",
    address2:"",
    city:"",
    province:"ON",
    postCode:"",
    country:"",

    //IssueTracking
    department:null,
    subject:null,
    category:[],
    activeDepartment:null,
    activeSubject:null,
    activeCategory:null,
    submissionIssueDescription:null,
    submissionConfirmationLoading:false,

    loginStatus: false,
    requestObj:null,

}

let store = createStore(stocksApp, state,  applyMiddleware(thunk));


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }
    componentWillMount() {
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }

    if(Platform.OS === 'android') {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Provider store={store}>
                    <Root>
                        <Container>
                            <AppRouteAndroid/>
                        </Container>
                    </Root>
                </Provider>
            </StyleProvider>
        );
    }
    if(Platform.OS === 'ios'){
      return (
          <StyleProvider style={getTheme(platform)}>
              <Provider store={store}>
                  <Root>
                      <AppRouteIos/>
                  </Root>
              </Provider>
          </StyleProvider>
        );
    }



  }
}

