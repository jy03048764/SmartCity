import React from 'react';
import {View, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer } from 'native-base';
import { Camera, Permissions } from 'expo';
import * as actions from "../actions/Actions";
import {connect} from "react-redux";

class CameraView extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1,
                                     height: Dimensions.get('window').height}}
                            type={this.state.type}
                            ref={ref => { this.camera = ref; }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'column',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-start'
                                }}
                                onPress={()=>this.props.navigation.navigate('Camera')}>
                                <Icon name={"close"} style={{fontSize:56, color:"white", paddingLeft:16}}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    justifyContent:'flex-end'
                                }}
                                onPress={async () => {
                                    if (this.camera) {
                                        let photo = await this.camera.takePictureAsync({quality:0.25,base64:true});
                                        this.props.cachePhoto(photo);
                                        this.props.navigation.navigate('SubmissionFlow');
                                    }

                                }}>
                                <Icon name={"radio-button-on"}
                                      style={{fontSize:72, color:"white"}}/>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return{
       // lobbySegment: state.lobbySegment,
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        cachePhoto: (obj) => {
            return dispatch(actions.cachePhoto(obj))
        }
    }
}



export default connect(mapStateToProps,mapDistpatchToProps)(CameraView)