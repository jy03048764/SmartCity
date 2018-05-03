import React from "react";
import {Container, Content, Icon, Left, List, ListItem, Text} from "native-base";
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import SideBar from "./components/SideBar";


import Requests from "./views/Requests";
import Map from "./views/Map";
import Camera from "./views/Camera";
import Profile from "./views/Profile";
import Phone from "./views/login/Phone";
import Verification from "./views/login/Verification";
import CreateProfile from "./views/login/CreateProfile";
import CameraView from "./views/CameraView";
import SubmissionFlow from "./views/SubmissionFlow";
import About from "./views/About";
import Feedback from "./views/Feedback";
import PhoneOrFacebook from "./views/login/PhoneOrFacebook";
import SubmissionDetails from "./views/SubmissionDetails";
import RequestListDetail from "./views/RequestListDetail";
import Confirmation from "./views/Confirmation";

var Strings = require('./res/strings/StringsEN.js');

export const RoutesNavIos = [
    {
        name: Strings.PAGE_HEADERS_MAP,
        route: "Map",
        icon: "compass"
    },
    {
        name: Strings.PAGE_HEADERS_CAMERA,
        route: "Camera",
        icon: "camera"
    },
    {
        name: Strings.PAGE_HEADERS_REQUESTS,
        route: "Requests",
        icon: "ios-paper"
    }
];


export const AppRouteIos = StackNavigator({
        //PhoneOrFacebook:{screen: PhoneOrFacebook},
        Map: {screen: Map},
        Camera: {screen: Camera},
        CameraView: { screen: CameraView },
        SubmissionFlow: { screen: SubmissionFlow },
        Requests: {screen: Requests},
        Profile: {screen: Profile},
        About: {screen: About},
        Feedback: {screen: Feedback},
        SubmissionDetails: {screen: SubmissionDetails},
        RequestListDetail: {screen: RequestListDetail},
        PhoneOrFacebook:{screen: PhoneOrFacebook},
        Phone: {screen: Phone},
        Verification: {screen:Verification},
        CreateProfile: {screen: CreateProfile},
        Confirmation: {screen: Confirmation},
    },
    {
        headerMode:'none'
    });

export const LoginFlow = StackNavigator({
        PhoneOrFacebook:{screen: PhoneOrFacebook},
        Phone: {screen: Phone},
        Verification: {screen:Verification},
        CreateProfile: {screen: CreateProfile},
        AppRouteIos: {screen: AppRouteIos},
    },
    {
        headerMode:'none'
    })



export const routesAndroid = [
    {
        name: Strings.PAGE_HEADERS_MAP,
        route: "Map",
        icon: "md-map"
    },
    {
        name: Strings.PAGE_HEADERS_CAMERA,
        route: "Camera",
        icon: "camera"
    },
    {
        name: Strings.PAGE_HEADERS_REQUESTS,
        route: "Requests",
        icon: "md-list-box"
    },
    {
        name: Strings.PAGE_HEADERS_ABOUT,
        route: "About",
    },
    {
        name: Strings.PAGE_HEADERS_FEEDBACK,
        route: "Feedback",
    }
];


export const AndroidSideBar = DrawerNavigator({
        Map: { screen: Map },
        Camera: { screen: Camera },
        Requests: { screen: Requests },
        Profile: { screen: Profile },
        About: {screen: About},
        Feedback: {screen: Feedback},
    },
    {
        contentComponent: props => <SideBar {...props} />,
    });

export const AppRouteAndroid = StackNavigator({

    AndroidSideBar: {screen: AndroidSideBar},
    Map: { screen: Map },
    Camera: { screen: Camera },
    SubmissionFlow: { screen: SubmissionFlow },
    CameraView: { screen: CameraView },
    Requests: { screen: Requests },
    Profile: { screen: Profile },
    About: {screen: About},
    Feedback: {screen: Feedback},
    SubmissionDetails: {screen: SubmissionDetails},
    RequestListDetail: {screen: RequestListDetail},
    PhoneOrFacebook: {screen: PhoneOrFacebook},
    Phone: {screen: Phone},
    Verification: {screen:Verification},
    CreateProfile: {screen: CreateProfile},
    Confirmation: {screen: Confirmation},
}, {
    headerMode: 'none',
});
