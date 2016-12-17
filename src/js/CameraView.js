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
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
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
    },
    text: {
        backgroundColor: '#0f0',
        width: 100,
        height: 100
    }
});


export default class CameraView extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            dragging: false,
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        };
    }

    componentWillMount() {
        this._pan = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                // Set the initial value to the current state
                /* this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});*/
                this.state.pan.setValue({x: 0, y: 0});

                Animated.spring(
                    this.state.scale,
                    { toValue: 1.1, friction: 3 }
                ).start();

                this.setState({ dragging: true });
            },

            // When we drag/pan the object, set the delate to the states pan position
            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }
            ]),

            onPanResponderRelease: (e, gesture) => {
                this.setState({ dragging: false });
            }
        });
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
            <View style={styles.container}>
                <Camera
                    aspect={Camera.constants.Aspect.fill}
                    style={styles.preview}
                    ref={ref => this.setCamera(ref)}
                >
                    <ImageOverlay
                        pan={this._pan}
                        pos={this.state.pan}
                    />
                </Camera>
                <Text
                    onPress={() => this.capture()}
                    style={styles.takePicture}
                >
                    Take a picture!
                </Text>
            </View>
        );
    }
}
