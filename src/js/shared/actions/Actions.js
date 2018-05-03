import axios from "axios/index";
import AsyncStorage from "react-native";

//region constants
export const CACHE_PHOTO = "CACHE_PHOTO";
export const EDIT_MODAL = "EDIT_MODAL";
export const FILTER_SEGMENT_TOGGLE = "FILTER_SEGMENT_TOGGLE";
export const USER_LOCATION = "USER_LOCATION";
export const MAP_MODAL = "MAP_MODAL";
export const DETAIL_MODAL = "DETAIL_MODAL";
export const STORE_REQUESTS = "STORE_REQUESTS";
export const STORE_SERVICES = "STORE_SERVICES";
export const SERVICES = "SERVICES";
export const UPDATE_ACTION_SHEET_VALUE = "UPDATE_ACTION_SHEET_VALUE";
export const DISTANCE_LOADED = "DISTANCE_LOADED";
export const CURRENT_REQUEST = "CURRENT_REQUEST";
export const DETAIL_REQUEST = "DETAIL_REQUEST";
export const PHONE_NUM = "PHONE_NUM";
export const VERIFICATION_CODE = "VERIFICATION_CODE";
export const UPDATE_REGION = "UPDATE_REGION";
export const ENC_CODE = "ENC_CODE";
export const FIRST_NAME = "FIRST_NAME";
export const LAST_NAME = "LAST_NAME";
export const EMAIL = "EMAIL";
export const ADDRESS_LINE_1 = "ADDRESS_LINE_1";
export const ADDRESS_LINE_2 = "ADDRESS_LINE_2";
export const CITY = "CITY";
export const PROVINCE = "PROVINCE";
export const POST_CODE = "POST_CODE";
export const COUNTRY = "COUNTRY";
export const VALIDATE_RESPONSE_CODE = "VALIDATE_RESPONSE_CODE";
export const RESPONSE_CODE_PROFILE = "RESPONSE_CODE_PROFILE";
export const STORE_USER_REQUESTS = "STORE_USER_REQUESTS";
export const STORE_DEPARTMENT = "STORE_DEPARTMENT";
export const SET_ACTIVE_DEPARTMENT = "SET_ACTIVE_DEPARTMENT";
export const STORE_SUBJECT = "STORE_SUBJECT";
export const SET_ACTIVE_SUBJECT = "SET_ACTIVE_SUBJECT";
export const STORE_CATEGORY = "STORE_CATEGORY";
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
export const SET_SUBMITTION_ISSUE_DESCRIPTION = "SET_SUBMITTION_ISSUE_DESCRIPTION";
export const SUBMISSION_CONFIRMATION_LOADING ="SUBMISSION_CONFIRMATION_LOADING";
export const UPDATE_LOGIN_STATUS = "UPDATE_LOGIN_STATUS";
export const SAVE_REQUEST_OBJ = "SAVE_REQUEST_OBJ";
//endregion

var Constants = require('../res/constants/AppConstants');


export function cachePhoto(obj) {
    return{
        type: CACHE_PHOTO,
        photo: obj
    }
}

export function editModal(bool) {
    return{
        type: EDIT_MODAL,
        editModal: bool
    }
}

export function filterSegmentToggle(int) {
    return{
        type: FILTER_SEGMENT_TOGGLE,
        filterActive: int
    }
}

export function getUserLocation(position) {
    return {
        type: USER_LOCATION,
        mapRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }
}

export function preload(position) {
    return(dispatch) => {
        dispatch(getUserLocation(position))
        dispatch(fetchRequestList(position))
        dispatch(fetchServiceList())
    }
}

export function updateLocation(position) {
    return{
        type:USER_LOCATION,
        mapRegion:{
            latitude: position.geometry.location.lat,
            longitude: position.geometry.location.lng,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0071,
        }
    }
}

export function updateRegion(position) {
    return{
        type:UPDATE_REGION,
        mapRegion:{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: position.latitudeDelta,
            longitudeDelta: position.longitudeDelta,
        }
    }
}

export function mapModal(bool) {
    return{
        type: MAP_MODAL,
        mapModal: bool
    }
}

export function detailModal(bool) {
    return{
        type:DETAIL_MODAL,
        detailModal: bool
    }
}

export function toggleModals() {
    return(dispatch)=>{
        dispatch(detailModal(true));
        dispatch(mapModal(false));

    }

}

export function storeRequests(obj) {
    console.log('STOREREQUESTS')
    // console.log(obj)
    return{
        type:STORE_REQUESTS,
        storeRequests: obj
    }
}

export function storeServices(obj) {
    return{
        type:STORE_SERVICES,
        storeServices: obj
    }
}

export function distanceLoaded(bool) {
    return{
        type:DISTANCE_LOADED,
        distanceLoaded: bool
    }
}

export function services(obj) {
    let payload = []
    for(var service in obj.list ){
        payload.push(obj.list[service].description)
    }

    //remove blank values and test entries
    payload.splice(payload.indexOf(''),1)
    payload.splice(payload.indexOf('Test'),1)

    //sort and add all/cancel entries
    payload.sort();
    //payload.unshift('All');
    payload.unshift('Clear filter');

    return{
        type: SERVICES,
        services: payload
    }

}



export function updateActionSheetValue(buttonIndex) {
    return{
        type: UPDATE_ACTION_SHEET_VALUE,
        actionSheetValue: buttonIndex
    }
}


export function updateDistance(requestList,distanceObj) {
    let payload = [];
    let newObj = {};

    for(let request in requestList.list) {
        requestList.list[request]['distance'] = distanceObj.rows[0].elements[request].distance.text
            payload.push(requestList.list[request])
    }
    payload.sort(function(a,b) {return (parseFloat(a.distance.split(' ')[0]) > parseFloat(b.distance.split(' ')[0])) ? 1 : ((parseFloat(b.distance.split(' ')[0]) > parseFloat(a.distance.split(' ')[0])) ? -1 : 0);} );

    for (let i=0; i<payload.length; i++) {
        newObj[i] = payload[i];
    }


    requestList.list = newObj

    return(dispatch)=>{
        dispatch(storeRequests(requestList))
        dispatch(distanceLoaded(true))
    }
}

export function updateMyDistance(requestList,distanceObj) {
    let payload = [];
    let newObj = {};

    for(let request in requestList.list) {
        requestList.list[request]['distance'] = distanceObj.rows[0].elements[request].distance.text
        payload.push(requestList.list[request])
    }
    payload.sort(function(a,b) {return (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0);} );

    for (let i=0; i<payload.length; i++) {
        newObj[i] = payload[i];
    }


    requestList.list = newObj

    return(dispatch)=>{
        dispatch(storeUserRequests(requestList))
    }
}


export function currentRequest(obj) {
    return{
        type: CURRENT_REQUEST,
        currentRequest: obj
    }
}

export function detailRequest(obj) {
    return{
        type: DETAIL_REQUEST,
        detailRequest: obj
    }
}

// API calls
export function calculateDistance(userLoc, requestList){
    console.log("CALL GOOGLE: DISTANCE");
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    let origin = JSON.stringify(userLoc.coords.latitude)+','+JSON.stringify(userLoc.coords.longitude)
    let destination = []
    let key = Constants.MAPS_API_KEY_PLACES
    for(let request in requestList.list) {
        destination.push(requestList.list[request].lat+","+requestList.list[request].long)
    }

    destination = destination.join('|')
        return (dispatch)=>{
            axios.get(url+'origins='+origin+'&destinations='+destination+'&key='+key)
                .then((response) => {
                    dispatch(updateDistance(requestList,JSON.parse(response.request.response)))
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

}

export function calculatePersonalDistance(userLoc, requestList){
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    let origin = JSON.stringify(userLoc.coords.latitude)+','+JSON.stringify(userLoc.coords.longitude)
    let destination = []
    let key = Constants.MAPS_API_KEY_PLACES
    for(let request in requestList.list) {
        destination.push(requestList.list[request].lat+","+requestList.list[request].long)
    }

    destination = destination.join('|')
    return (dispatch)=>{
        axios.get(url+'origins='+origin+'&destinations='+destination+'&key='+key)
            .then((response) => {
                dispatch(updateMyDistance(requestList,JSON.parse(response.request.response)))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

export function fetchRequestList(position){
    console.log("REQUEST_LIST: FETCH");
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/getPublicRequests',
            {},
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {

                dispatch(storeRequests(JSON.parse(response.request.response)))
                dispatch(calculateDistance(position,JSON.parse(response.request.response)))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function fetchServiceList(){
    console.log("SERVICE_LIST: FETCH");
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/getServiceList',
            {},
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                dispatch(storeServices(JSON.parse(response.request.response)))
                dispatch(services(JSON.parse(response.request.response)))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function requestDetail(ID, mgisID, bool) {
    console.log("REQUEST_DETAIL: FETCH")
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/getRequestInfo',
            {
                "requestIdOpen311"	: ID,
                "requestId"			: mgisID
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                //console.log(JSON.parse(response.request.response))
                dispatch(currentRequest(JSON.parse(response.request.response).info))
                if(bool) {
                    dispatch(mapModal(bool))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

//login checks
export function phoneNum(phone) {
    return{
        type: PHONE_NUM,
        phone: phone
    }
}



export function checkByPhone(phone, code) {
    console.log("USERCHECK: PHONE")
    console.log(phone)
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/auth/checkPhoneRegister',
            {
                "phone"	: phone
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                // console.log(JSON.parse(response.request.response))
                if(JSON.parse(response.request.response).errorCode == 83){
                    //generate phone verification code (no countrycode in phone yet)
                    dispatch(verificationCode(phone))
                    dispatch((validateResponseCodeProfile(JSON.parse(response.request.response))))
                }
                if(JSON.parse(response.request.response).errorCode == 82){
                    //store response object
                    console.log(code)
                    if(code != null){
                        dispatch(loginByPhone(phone,code))
                    }
                    dispatch((validateResponseCodeProfile(JSON.parse(response.request.response))))

                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

export function verificationCode(phone) {
    console.log("GENERATE: CODE")
    console.log(phone)
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/info/generateAuthCode',
            {
                "countryId": 38,
                "userPhone": phone
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function setCode(code) {
    return{
        type: VERIFICATION_CODE,
        code: code
    }
}

export function saveUserCode(encCode) {
    return{
        type: ENC_CODE,
        encCode: encCode
    }
}
export function validateResponseCode(code) {
    return{
        type: VALIDATE_RESPONSE_CODE,
        responseCode: code
    }
}


export function verificationEntry(code, phone) {
    console.log("VERIFY: CODE")
    console.log(phone)
    return (dispatch)=>{
        dispatch(setCode(code))
        let Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        let encCode = Base64.encode(code)
        axios.post(Constants.BASE_URL + '/registerservice/api/info/validateAuthCode',
            {
                "countryId": 38,
                "userPhone": phone,
                "userAuthCode": encCode
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                dispatch(validateResponseCode(JSON.parse(response.request.response).errorCode))
                if (JSON.parse(response.request.response).errorCode == 0){
                    //console.log(encCode)
                    dispatch(saveUserCode(encCode))
                }
                if(JSON.parse(response.request.response).errorCode != 0){
                    alert("Code invalid")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function setFirstName(text){
    return{
        type: FIRST_NAME,
        firstName: text
    }
}

export function setLastName(text){
    return{
        type: LAST_NAME,
        lastName: text
    }
}

export function setEmail(text){
    return{
        type: EMAIL,
        email: text
    }
}

export function setAddress1(text){
    return{
        type: ADDRESS_LINE_1,
        address1: text
    }
}

export function setAddress2(text){
    return{
        type: ADDRESS_LINE_2,
        address2: text
    }
}

export function setCity(text){
    return{
        type: CITY,
        city: text
    }
}

export function setProvince(text){
    return{
        type: PROVINCE,
        province: text
    }
}

export function setPostCode(text){
    return{
        type: POST_CODE,
        postCode: text
    }
}

export function setCountry(text){
    return{
        type: COUNTRY,
        country: text
    }
}

export function validateResponseCodeProfile(obj){
    return{
        type: RESPONSE_CODE_PROFILE,
        responseCodeProfile: obj
    }
}


//Create User
export function createUserByPhone(obj) {
    console.log("CREATE_USER: BY_PHONE")
    console.log(obj.phone)
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/auth/createUserByPhone',
            {
                "firstname"			: obj.firstName,
                "lastname"			: obj.lastName,
                "phone"				: obj.phone,
                "password"			: obj.encCode,
                "confirmPassword"	: obj.encCode,
                "isOauth"			: false,
                "isTUAccepted"		: true,
                "isPSAccepted"		: true,
                "emailAddress"		: obj.email,
                "addressLine1"		: obj.address1,
                "addressLine2"		: obj.address2,
                "city"				: obj.city,
                "countryId"			: 38,
                "postalCode"		: obj.postCode,
                "stateId"			: obj.province,
                "latLongString"		: ""
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))
                dispatch(loginByPhone((obj.phone), obj.encCode))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function updateUser(obj) {
    console.log("UPDATE_USER")
    console.log(obj)
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/auth/updateProfile',
            {
                "userId"			: obj.userId,
                "firstname"			: obj.firstName,
                "lastname"			: obj.lastName,
                "phone"				: obj.phone,
                "emailAddress"		: obj.email,
                "addressLine1"		: obj.address1,
                "addressLine2"		: obj.address2,
                "city"				: obj.city,
                "countryId"			: 38,
                "postalCode"		: obj.postCode,
                "stateId"			: obj.province,
                "latLongString"		: ""
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                    "PTM_HEADER_TOKEN": obj.token,
                    "PTM_HEADER_TOKEN_ENCRYPTION": obj.tokenEncryption,
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))
                dispatch(validateResponseCodeProfile(JSON.parse(response.request.response)))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

//Login with Phone
export function loginByPhone(phone, encCode) {
    console.log("LOGIN: ATTEMPT")
    console.log(phone)
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/auth/loginByPhone',
            {
                "phone": phone,
                "password": encCode,
                "version": "",
                "isOauth": false
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))
                dispatch(updateLoginStatus(true))
                if(JSON.parse(response.request.response).errorCode == 0) {
                    dispatch(validateResponseCodeProfile(JSON.parse(response.request.response)))

                    //set up user fields
                    dispatch(setFirstName(JSON.parse(response.request.response).firstName))
                    dispatch(setLastName(JSON.parse(response.request.response).lastName))
                    dispatch(setEmail(JSON.parse(response.request.response).username))
                    dispatch(setAddress1(JSON.parse(response.request.response).addressLine1))
                    dispatch(setAddress2(JSON.parse(response.request.response).addressLine2))
                    dispatch(setCity(JSON.parse(response.request.response).city))
                    dispatch(setProvince(JSON.parse(response.request.response).stateId))
                    dispatch(setPostCode(JSON.parse(response.request.response).postalCode))
                    dispatch(setCountry("Canada"))

                    //get user request and acknowledges
                    dispatch(getPersonalReqs(JSON.parse(response.request.response).userId))


                }
                if(JSON.parse(response.request.response).errorCode != 0) {
                    console.log("no login")
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

//get personal requests and acknowledges
export function getPersonalReqs(userId) {
    console.log("FETCH: USER_REQS")
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/getMyRequests',
            {
                "userId": userId
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
               // console.log(JSON.parse(response.request.response))
                dispatch(storeUserRequests(JSON.parse(response.request.response)))
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        dispatch(calculatePersonalDistance(position,JSON.parse(response.request.response)))
                    },
                    (error) => alert(error.message),
                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                );


            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function storeUserRequests(obj){
    return{
        type: STORE_USER_REQUESTS,
        storeUserRequests: obj
    }
}

export function toggleAck(userId, bool, id311, id) {
    console.log("TOGGLE: ACK " + bool )
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/acknowledgeRequest',
            {
                "userId": userId,
                "requestIdOpen311": id311,
                "requestId": id,
                "acknowledge": bool
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))
                if(JSON.parse(response.request.response).errorCode === 0){
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            dispatch(fetchRequestList(position))
                            dispatch(getPersonalReqs(userId))
                            dispatch(requestDetail(id311,id))
                        },
                        (error) => alert(error.message),
                        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

//Creating posts
export function buildDepartment(obj) {

    obj.sort(function(a,b) {return (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0);} );
    return (dispatch) =>{
        dispatch(storeDepartment(obj))
        dispatch(setActiveSubject(null))
        dispatch(setActiveCategory(null))
    }
}

export function storeDepartment(obj) {
    return{
        type: STORE_DEPARTMENT,
        department: obj
    }
}

export function reset() {
    return(dispatch)=>{
        dispatch(setActiveSubject(null))
        dispatch(setActiveCategory(null))
        dispatch(storeSubject(null))
        dispatch(storeCategory(null))
        dispatch(buildSubject(null,null))
        dispatch(buildCategory(null,null))
    }
}

export function setActiveDepartment(value) {
    return{
        type: SET_ACTIVE_DEPARTMENT,
        activeDepartment: value
    }
}

export function buildSubject(departmentId, departmentList) {
    return (dispatch) =>{
        for(let item in departmentList){
            if(departmentList[item].id == departmentId){
                departmentList[item].subTypes.sort(function(a,b) {return (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0);} );
                dispatch(storeSubject(departmentList[item].subTypes))
            }
        }
        dispatch(setActiveCategory(null))
    }
}

export function storeSubject(subjects) {
    return{
        type: STORE_SUBJECT,
        subject: subjects
    }
}

export function setActiveSubject(value) {
    return{
        type: SET_ACTIVE_SUBJECT,
        activeSubject: value
    }
}

export function buildCategory(subjectCode, subTypes) {
    return (dispatch) => {
        for (let item in subTypes) {
            if (subTypes[item].code == subjectCode) {
                subTypes[item].issues.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                });
                dispatch(storeCategory(subTypes[item].issues))
            }
        }
    }
}

export function storeCategory(categories) {
    return{
        type: STORE_CATEGORY,
        category: categories
    }
}

export function setActiveCategory(value) {
    return{
        type: SET_ACTIVE_CATEGORY,
        activeCategory: value
    }
}

export function setSubmitIssueDescription(text) {
    return{
        type: SET_SUBMITTION_ISSUE_DESCRIPTION,
        submissionIssueDescription: text
    }

}

export function buildRequest(requestObj, userObj) {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(convertCoords(position, requestObj, userObj))
                dispatch(submissionConfirmationLoading(true))
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
}

export function submissionConfirmationLoading(bool) {
    return{
        type: SUBMISSION_CONFIRMATION_LOADING,
        submissionConfirmationLoading: bool
    }
}

export function convertCoords(position, requestObj, userObj) {
    return (dispatch)=>{
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&result_type=street_address|route|locality|postal_code|administrative_area_level_1&key='+Constants.MAPS_API_KEY_PLACES,
            {},
            {},).then((response) => {
                let loc = JSON.parse(response.request.response).results[0].formatted_address
                dispatch(compileRequest(position, requestObj, userObj, loc))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export function compileRequest(position, requestObj, userObj, loc) {
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/requests/createNewRequest',
            {
                "userId"			: userObj.userId,
                "serviceId"			: requestObj.serviceId,
                "serviceCode"		: requestObj.serviceCode,
                "serviceIssue"		: requestObj.serviceIssue,
                "longTimestamp"		: requestObj.longTimestamp,
                "requestDescription": requestObj.description,
                "coordLat"			: position.coords.latitude,
                "coordLong"			: position.coords.longitude,
                "addressLine1"		: loc.split(',')[0],
                "addressLine2"		: "",
                "postalCode"		: loc.split(',')[2].split(' ')[2]+loc.split(',')[2].split(' ')[3],
                "city"				: loc.split(',')[1],
                "provinceId"		: loc.split(',')[2].split(' ')[1],
                "countryId"			: 38,
                "deviceId"			: "",
                "stringImage"		: requestObj.stringImage
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json',
                }
            },
        )
            .then((response) => {
                console.log(JSON.parse(response.request.response))
                dispatch(submissionConfirmationLoading(false))
                dispatch(resetState())

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function resetState(){
    return (dispatch) =>{
        dispatch(storeDepartment(null))
        dispatch(storeSubject(null))
        dispatch(storeCategory([]))
        dispatch(setActiveDepartment(null))
        dispatch(setActiveSubject(null))
        dispatch(setActiveCategory(null))
        dispatch(setSubmitIssueDescription(null))
        dispatch(saveRequestObj(null))
    }
}

export function logOut(userId, token, tokenEncryption){
    return (dispatch)=>{
        axios.post(Constants.BASE_URL + '/registerservice/api/auth/logout',
            {
                "userId": userId,
            },
            {
                headers: {
                    'PTM_HEADER_ORG_ID': Constants.ORGANIZATION_ID,
                    'PTM_HEADER_APP_ID': Constants.MGIS_APP_ID,
                    'PTM_LANGUAGE': 'eng',
                    'Content-Type': 'application/json; charset=utf-8',
                    "PTM_HEADER_TOKEN": token,
                    "PTM_HEADER_TOKEN_ENCRYPTION": tokenEncryption,
                }
            },
        )
            .then((response) => {
               // console.log(JSON.parse(response.request.response))
                dispatch(validateResponseCodeProfile(null))
                //dispatch(storeUserRequests(null))
                dispatch(updateLoginStatus(false))


            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function updateLoginStatus(bool) {
    return{
        type: UPDATE_LOGIN_STATUS,
        loginStatus: bool
    }

}

export function saveRequestObj(obj){
    return{
        type: SAVE_REQUEST_OBJ,
        requestObj: obj
    }
}



