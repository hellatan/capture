// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PanResponder,
    Animated
} from 'react-native';

import Camera from 'react-native-camera';
import ImageOverlay from './ImageOverlay';


const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    takePicture: {
        flex: 0,
        padding: 10,
        margin: 50,
        borderWidth: 1,
        borderColor: '#fff'
    }
});


export default class CameraView extends Component {
    constructor(props) {
        super(props);

        this.camera = null;
        this.panResponder = null;
    }

    setCamera(ref) {
        this.camera = ref;
    }

    capture() {
        this.camera.capture()
            .then(data => {
                console.log("DATA", data);
            })
            .catch(err => {
                console.log("ERROR", err);
            });
    }

    render() {
        return (
            <View>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    style={styles.preview}
                    ref={ref => this.setCamera(ref)}
                >
                    <Text
                        onPress={() => this.capture()}
                        style={styles.takePicture}
                    >
                        Take a picture!
                    </Text>
                    <ImageOverlay
                        pan={this.panResponder}
                    />
                </Camera>
            </View>
        );
    }
}
