import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';


export default class FabButton extends Component {

    render() {
        return (
                    <Fab
                        containerStyle={{ }}
                        style={{ backgroundColor: '#059980' }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate("Camera")}>
                        <Icon name="camera" />
                    </Fab>
        );
    }
}