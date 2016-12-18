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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#779'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSection: {
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#abc'
    },
    takePicture: {
        flex: 1,
        flexBasis: 50,
        padding: 10,
        margin: 20,
        borderWidth: 1,
        borderColor: '#fff',
        textAlign: 'center'
    }
});


export default class CameraView extends Component {
    constructor(props) {
        super(props);

        this.camera = null;
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
        const {item, backToMenu} = this.props;
        return (
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    style={styles.preview}
                    ref={ref => this.setCamera(ref)}
                >
                    <ImageOverlay
                        image={item.imageSource}
                    />
                </Camera>
                <View style={styles.bottomSection}>
                    <Text
                        onPress={() => backToMenu()}
                        style={styles.takePicture}
                    >
                        Back
                    </Text>
                    <Text
                        onPress={() => this.capture()}
                        style={styles.takePicture}
                    >
                        Take a picture!
                    </Text>
                </View>
            </View>
        );
    }
}
