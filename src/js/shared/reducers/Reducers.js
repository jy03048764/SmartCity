import {
    CACHE_PHOTO,
    EDIT_MODAL,
    FILTER_SEGMENT_TOGGLE,
    MAP_MODAL,
    USER_LOCATION,
    DETAIL_MODAL,
    STORE_REQUESTS,
    STORE_SERVICES,
    SERVICES,
    UPDATE_ACTION_SHEET_VALUE,
    DISTANCE_LOADED,
    CURRENT_REQUEST,
    DETAIL_REQUEST, PHONE_NUM,
    VERIFICATION_CODE, UPDATE_REGION,
    ENC_CODE,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    CITY,
    PROVINCE,
    POST_CODE,
    COUNTRY,
    VALIDATE_RESPONSE_CODE,
    RESPONSE_CODE_PROFILE,
    STORE_USER_REQUESTS,
    STORE_DEPARTMENT,
    SET_ACTIVE_DEPARTMENT,
    STORE_SUBJECT,
    SET_ACTIVE_SUBJECT,
    STORE_CATEGORY,
    SET_ACTIVE_CATEGORY,
    SUBMISSION_CONFIRMATION_LOADING,
    SET_SUBMITTION_ISSUE_DESCRIPTION, UPDATE_LOGIN_STATUS,
    SAVE_REQUEST_OBJ
} from "../actions/Actions";




export default function stocksApp(state, action) {
    let newState = Object.assign({},state);

    switch(action.type) {
        case CACHE_PHOTO:
            let photoCached = action.photo
            newState = Object.assign({}, state, {photoCached});
          //  console.log(newState)
            break;
        case EDIT_MODAL:
            let editModal = action.editModal
            newState = Object.assign({}, state, {editModal});
          //  console.log(newState)
            break;
        case MAP_MODAL:
            let mapModal = action.mapModal
            newState = Object.assign({}, state, {mapModal});
          //  console.log(newState)
            break;
        case DETAIL_MODAL:
            let detailModal = action.detailModal
            newState = Object.assign({}, state, {detailModal});
          //  console.log(newState)
            break;
        case FILTER_SEGMENT_TOGGLE:
            let filterButton = action.filterActive
            if(filterButton == 1){
                filterSegment = [true,false,false]
                newState = Object.assign({}, state, {filterSegment});
                break;
            }
            if(filterButton == 2) {
                filterSegment = [false, true,false]
                newState = Object.assign({}, state, {filterSegment});
                break;
            }
            if(filterButton == 3) {
                filterSegment = [false,false, true]
                newState = Object.assign({}, state, {filterSegment});
                break;
            }
          //  console.log(newState)
            break;
        case USER_LOCATION:
            let mapRegion = action.mapRegion
            newState = Object.assign({}, state, {mapRegion});
          //  console.log(newState)
            break;
        case STORE_REQUESTS:
            let storeRequests = action.storeRequests
            newState = Object.assign({}, state, {storeRequests});
          //  console.log(newState)
            break;
        case STORE_SERVICES:
            let storeServices = action.storeServices
            newState = Object.assign({}, state, {storeServices});
          //  console.log(newState)
            break;
        case SERVICES:
            let services = action.services
            newState = Object.assign({}, state, {services});
            //  console.log(newState)
            break;
        case UPDATE_ACTION_SHEET_VALUE:
            let actionSheetValue = action.actionSheetValue
            newState = Object.assign({}, state, {actionSheetValue});
            //  console.log(newState)
            break;
        case DISTANCE_LOADED:
            let distanceLoaded = action.distanceLoaded
            newState = Object.assign({}, state, {distanceLoaded});
            //  console.log(newState)
            break;
        case CURRENT_REQUEST:
            let currentRequest = action.currentRequest
            newState = Object.assign({}, state, {currentRequest});
            //  console.log(newState)
            break;
        case DETAIL_REQUEST:
            let detailRequest = action.detailRequest
            newState = Object.assign({}, state, {detailRequest});
            //  console.log(newState)
            break;
        case PHONE_NUM:
            let phone = action.phone
            newState = Object.assign({}, state, {phone});
            //console.log(newState)
            break;
        case VERIFICATION_CODE:
            let code = action.code
            newState = Object.assign({}, state, {code});
            //console.log(newState)
            break;
        case UPDATE_REGION:
            mapRegion = action.mapRegion
            newState = Object.assign({}, state, {mapRegion});
            //console.log(newState)
            break;
        case ENC_CODE:
            encCode = action.encCode
            newState = Object.assign({}, state, {encCode});
            //console.log(newState)
            break;
        case FIRST_NAME:
            firstName = action.firstName
            newState = Object.assign({}, state, {firstName});
            //console.log(newState)
            break;
        case LAST_NAME:
            lastName = action.lastName
            newState = Object.assign({}, state, {lastName});
            //console.log(newState)
            break;
        case EMAIL:
            email = action.email
            newState = Object.assign({}, state, {email});
            //console.log(newState)
            break;
        case ADDRESS_LINE_1:
            address1 = action.address1
            newState = Object.assign({}, state, {address1});
            //console.log(newState)
            break;
        case ADDRESS_LINE_2:
            address2 = action.address2
            newState = Object.assign({}, state, {address2});
            //console.log(newState)
            break;
        case CITY:
            city = action.city
            newState = Object.assign({}, state, {city});
            //console.log(newState)
            break;
        case PROVINCE:
            province = action.province
            newState = Object.assign({}, state, {province});
            //console.log(newState)
            break;
        case POST_CODE:
            postCode = action.postCode
            newState = Object.assign({}, state, {postCode});
            //console.log(newState)
            break;
        case COUNTRY:
            country = action.country
            newState = Object.assign({}, state, {country});
            //console.log(newState)
            break;
        case VALIDATE_RESPONSE_CODE:
            responseCode = action.responseCode
            newState = Object.assign({}, state, {responseCode});
            //console.log(newState)
            break;
        case RESPONSE_CODE_PROFILE:
            responseCodeProfile = action.responseCodeProfile
            newState = Object.assign({}, state, {responseCodeProfile});
            //console.log(newState)
            break;
        case STORE_USER_REQUESTS:
            storeUserRequests = action.storeUserRequests
            newState = Object.assign({}, state, {storeUserRequests});
            //console.log(newState)
            break;
        case STORE_DEPARTMENT:
            department = action.department
            newState = Object.assign({}, state, {department});
            //console.log(newState)
            break;
        case SET_ACTIVE_DEPARTMENT:
            activeDepartment = action.activeDepartment
            newState = Object.assign({}, state, {activeDepartment});
            //console.log(newState)
            break;
        case STORE_SUBJECT:
            subject = action.subject
            newState = Object.assign({}, state, {subject});
            //console.log(newState)
            break;
        case SET_ACTIVE_SUBJECT:
            activeSubject = action.activeSubject
            newState = Object.assign({}, state, {activeSubject});
            //console.log(newState)
            break;
        case STORE_CATEGORY:
            category = action.category
            newState = Object.assign({}, state, {category});
            //console.log(newState)
            break;
        case SET_ACTIVE_CATEGORY:
            activeCategory = action.activeCategory
            newState = Object.assign({}, state, {activeCategory});
            //console.log(newState)
            break;
        case SET_SUBMITTION_ISSUE_DESCRIPTION:
            submissionIssueDescription = action.submissionIssueDescription
            newState = Object.assign({}, state, {submissionIssueDescription});
            //console.log(newState)
            break;
        case SUBMISSION_CONFIRMATION_LOADING:
            submissionConfirmationLoading = action.submissionConfirmationLoading
            newState = Object.assign({}, state, {submissionConfirmationLoading});
            //console.log(newState)
            break;
        case UPDATE_LOGIN_STATUS:
            loginStatus = action.loginStatus
            newState = Object.assign({}, state, {loginStatus});
            //console.log(newState)
            break;
        case SAVE_REQUEST_OBJ:
            requestObj = action.requestObj
            newState = Object.assign({}, state, {requestObj});
            //console.log(newState)
            break;
        default:
            return state;

    }
    return newState;
}










