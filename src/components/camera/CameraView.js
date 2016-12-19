// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    CameraRoll,
    Image,
    TouchableHighlight,
    Animated
} from 'react-native';

import {takeSnapshot} from "react-native-view-shot";
import Camera from 'react-native-camera';
import ImageOverlay from './ImageOverlay';

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff'
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
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
        alignItems: 'center'
    },
    bottomSection: {
        flexGrow: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000'
    },
    buttonContainer: {
        borderRadius: 60,
        width: 60,
        height: 60,
        margin: 10,
        borderWidth: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerButtonContainer: {
        borderRadius: 50,
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraIcon: {
        height: 20,
        width: 20
    }
});


type CameraViewProps = {
    item: Object
};

export default class CameraView extends Component {
    constructor(props: CameraViewProps) {
        super(props);

        this.camera = null;
        this.container = null;

        this.state = {
            tmpScreen: null,
            format: 'jpg',
            quality: .9,
            overlayOpacity: new Animated.Value(0),
            showOverlay: false
        };
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

    props: CameraViewProps;

    setCamera(ref) {
        this.camera = ref;
    }

    setContainer(ref) {
        this.container = ref;
    }

    realCapture() {
        const {format, quality} = this.state;
        takeSnapshot(this.container, {format, quality})
            .then(data => {
                const file = `file://${data}`;
                CameraRoll.saveToCameraRoll(file);
            })
            .catch(err => console.log('ERR: ', err))
            .then(() => {
                this.setState({
                    tmpScreen: null
                });
            });
    }

    capture() {
        this.setState({ showOverlay: true });
        this.state.overlayOpacity.setValue(0);

        Animated.timing(
            this.state.overlayOpacity,
            {
                toValue: 1,
                duration: 150
            }
        ).start();

        this.camera.capture()
            .then(picData => {
                this.setState({
                    showOverlay: false,
                    tmpScreen: picData.path
                });
            })
            .catch(err => console.log("ERROR", err));
    }

    render() {
        const {width, height} = Dimensions.get('window');
        const {item} = this.props;
        const {tmpScreen, overlayOpacity, showOverlay} = this.state;
        const source = tmpScreen ? {
            uri: tmpScreen,
            width: width,
            height: height
        } : null;

        const opacity = overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        return (
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget={Camera.constants.CaptureTarget.disk}
                    style={styles.preview}
                    ref={ref => this.setCamera(ref)}
                >
                    <View style={styles.fullScreen} ref={ref => this.setContainer(ref)}>
                        <Image style={styles.snapshot} source={source}>
                            <ImageOverlay image={item.imageSource} />
                        </Image>
                    </View>
                </Camera>
                {showOverlay &&
                 <Animated.View style={[styles.overlay, {opacity}]}>
                     <Image source={null} />
                 </Animated.View>
                }
                <View style={styles.bottomSection}>
                    <TouchableHighlight
                        onPress={() => this.capture()}
                    >
                    <View
                        style={styles.buttonContainer}
                    >
                        <View style={styles.innerButtonContainer}>
                            <Image
                                style={styles.cameraIcon}
                                source={require('../../assets/camera_icon.png')}
                            />
                        </View>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
