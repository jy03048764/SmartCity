import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Spinner } from 'native-base';
import { MapView, Animated } from 'expo';
import {connect} from "react-redux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as actions from "../../actions/Actions";


var Strings = require('../../res/strings/StringsEN');

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;



class AddressSearch extends Component {
    render() {
            return(
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.props.updateLocation(details);
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyDvOmGVpn_LXS2ATViAcvZTniJHW3DDxQA',
                            language: 'en', // language of the results
                            types: '', // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}

                        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list


                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    />
            )

        }
}


function mapStateToProps(state) {
    return{
        mapRegion: state.mapRegion,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        updateLocation: (position) => {
            return dispatch(actions.updateLocation(position))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(AddressSearch)