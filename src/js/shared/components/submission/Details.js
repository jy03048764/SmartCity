import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Image,
    TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Spinner, Form, Picker, Item } from 'native-base';
import * as actions from "../../actions/Actions";
import {connect} from "react-redux";

const Strings = require('../../res/strings/StringsEN');
const Styles = require('../../res/assets/styles/Styles');


let departments;
let subjects;
let categories;

let button;

let properId;

class Details extends Component {

    componentWillMount(){
        this.props.buildDepartment(this.props.storeServices)
    }

    setActiveAndBuildSubject =(value)=>{
        this.props.setActiveDepartment(value)
        this.props.reset()
        this.props.buildSubject(value, this.props.department)
    }

    setActiveAndBuildCategory =(value)=> {
        this.props.setActiveSubject(value)
        this.props.buildCategory(value, this.props.subject)
        for(let item in this.props.subject){
            if(this.props.subject[item].code == value) {
                properId = this.props.subject[item].id
                }
            }
    }

    proceed = (requestObj) => {
        this.props.buildRequest(requestObj, this.props.responseCodeProfile)
        this.props.navigation.navigate('Confirmation')
    }

    loginRedirect = (requestObj) =>{
        this.props.navigation.navigate('PhoneOrFacebook')
        this.props.saveRequestObj(requestObj)
    }

    render() {
        if(this.props.department != null){
            departments =
                <Picker mode="dropdown" placeholder={Strings.SUBMISSION_DETAILS_DEPARTMENT} note={false}
                        onValueChange={(value)=>this.setActiveAndBuildSubject(value)}
                        selectedValue={this.props.activeDepartment}style={Styles.details.pickerField}
                >
                    {Object.keys(this.props.department).map(function (item) {
                        return(
                            <Item key={item} label={this.props.department[item].description} value={this.props.department[item].id}/>
                        )
                    }.bind(this))}
                </Picker>
        }
        if(this.props.subject != null) {
            subjects =
                <Picker mode="dropdown" placeholder={Strings.SUBMISSION_DETAILS_SUBJECT} note={false}
                        onValueChange={(value) => this.setActiveAndBuildCategory(value)}
                        selectedValue={this.props.activeSubject}
                >
                    {Object.keys(this.props.subject).map(function (item) {
                        return (
                            <Item key={this.props.subject[item].id} label={this.props.subject[item].description}
                                  value={this.props.subject[item].code}/>
                        )
                    }.bind(this))}

                </Picker>
        }
        if(this.props.activeCategory == null){
            categories = <Text/>;
        }

        if(this.props.category != null && this.props.category.length > 0){
            categories=
                <Picker mode="dropdown" placeholder={Strings.SUBMISSION_DETAILS_SUBJECT} note={false}
                        onValueChange={(value)=>this.props.setActiveCategory(value)}
                        selectedValue={this.props.activeCategory}
                >
                    {Object.keys(this.props.category).map(function (item) {
                        return(
                            <Item key={item} label={this.props.category[item].name} value={this.props.category[item].key}/>
                        )
                    }.bind(this))}

                </Picker>
        }
        if(this.props.activeDepartment != null && this.props.activeSubject !=null && this.props.submissionIssueDescription != null && this.props.imageSource != {}) {
            let requestObj = {
                serviceId: properId,
                serviceCode: this.props.activeSubject,
                serviceIssue: (this.props.activeCategory != null) ? this.props.activeCategory : "",
                longTimestamp: Date.now(),
                stringImage: 'data:image/png;base64,' + this.props.imageSource.base64,
                description: this.props.submissionIssueDescription
            }

            if (this.props.loginStatus === true) {
                button = <Button style={Styles.requests.submitButton}
                                 onPress={() => this.proceed(requestObj)}><Text>{Strings.BUTTONS_SUBMIT}</Text></Button>

            }
            if (this.props.loginStatus != true) {
                button = <Button style={Styles.requests.submitButton}
                                 onPress={() => this.loginRedirect(requestObj)}><Text>{Strings.BUTTONS_SUBMIT}</Text></Button>

            }
        }
        return(
            <View
                style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'column',}}>

                <Image source={{uri: 'data:image/png;base64,'+ this.props.imageSource.base64}}  style={{height: 250, width: 500}}/>
                <KeyboardAvoidingView style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'center'}} behavior="padding">
                    <Form>
                        {departments}
                        {subjects}
                        {categories}

                    <TextInput style={Styles.details.textInput}placeholder='Enter a Description' onChangeText={(text)=>this.props.setSubmitIssueDescription(text)} multiline={true} maxLength={255} autogrow={true}/>
                    </Form>
                </KeyboardAvoidingView>

                {button}

            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        imageSource: state.photoCached,
        responseCodeProfile: state.responseCodeProfile,
        storeServices: state.storeServices.list,
        department: state.department,
        activeDepartment: state.activeDepartment,
        subject: state.subject,
        activeSubject: state.activeSubject,
        category: state.category,
        activeCategory: state.activeCategory,
        submissionIssueDescription: state.submissionIssueDescription,
        loginStatus: state.loginStatus
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        cachePhoto: (obj) => {
            return dispatch(actions.cachePhoto(obj))
        },
        buildDepartment: (list) => {
            dispatch(actions.buildDepartment(list))
        },
        setActiveDepartment: (value) => {
            dispatch(actions.setActiveDepartment(value))
        },
        buildSubject: (departmentId, departmentList) => {
            dispatch(actions.buildSubject(departmentId, departmentList))
        },
        setActiveSubject: (value) => {
            dispatch(actions.setActiveSubject(value))
        },
        buildCategory: (value, subjects) => {
            dispatch(actions.buildCategory(value, subjects))
        },
        setActiveCategory: (value) => {
            dispatch(actions.setActiveCategory(value))
        },
        reset: () => {
            dispatch(actions.reset())
        },
        setSubmitIssueDescription: (text) => {
            dispatch(actions.setSubmitIssueDescription(text))
        },
        buildRequest: (requestObj, userObj) => {
            dispatch(actions.buildRequest(requestObj, userObj))
        },
        saveRequestObj: (requestObj) => {
            dispatch(actions.saveRequestObj(requestObj))
        }


    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(Details)