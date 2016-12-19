// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PanResponder,
    Animated,
    CameraRoll,
    Image
} from 'react-native';

import {takeSnapshot} from "react-native-view-shot";
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
        alignItems: 'stretch'
    },
    snapshot: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
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
        this.container = null;

        this.state = {
            tmpScreen: null,
            format: 'jpg',
            quality: .9
        }
    }

    setCamera(ref) {
        this.camera = ref;
    }

    setContainer(ref) {
        this.container = ref;
    }

    componentDidUpdate(prevProps, prevState) {
        setTimeout(() => {
            // need to use setTimeout here otherwise the camera capture
            // will not be available to the screen capture yet
            if (this.state.tmpScreen !== null && prevState.tmpScreen === null) {
                this.realCapture();
            }
        }, 200);
    }

    realCapture() {
        const {format, quality} = this.state
        takeSnapshot(this.container, {format, quality})
            .then(data => {
                const file = `file://${data}`;
                CameraRoll.saveToCameraRoll(file);
                this.setState({
                    tmpScreen: null
                })
            })
            .catch(err => console.log('ERR: ', err));
    }

    capture() {
        this.camera.capture()
            .then(picData => {
                this.setState({
                    tmpScreen: picData.path
                });
            })
            .catch(err => console.log("ERROR", err));
    }

    render() {
        const {width, height} = Dimensions.get('window');
        const {item, backToMenu} = this.props;
        const source = this.state.tmpScreen ? {
                uri: this.state.tmpScreen,
                width: width,
                height: height
            } : null;
        return (
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget={Camera.constants.CaptureTarget.disk}
                    style={styles.preview}
                    ref={ref => this.setCamera(ref)}
                >
                    <View style={styles.snapshot} ref={ref => this.setContainer(ref)}>
                        <Image style={styles.snapshot} source={source}>
                            <ImageOverlay image={item.imageSource} />
                        </Image>
                    </View>
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
