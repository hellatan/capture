// @flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    PanResponder,
    Animated
} from 'react-native';

// maybe want to make this more dynamic later?
const INITIAL_SIZE = 200;

// this is hacky because i don't know how to do border-box in react native
const BORDER_WIDTH = 2;

const DIJON_COLOR = '#a38e44';

const styles = StyleSheet.create({
    drag: {
        flex: 0,
        width: INITIAL_SIZE,
        height: INITIAL_SIZE
    },
    dragging: {
        opacity: 0.7
    },
    scaling: {
        borderWidth: BORDER_WIDTH,
        borderColor: DIJON_COLOR
    },
    image: {
        width: INITIAL_SIZE,
        height: INITIAL_SIZE
    },
    untouchedBorder: {
        flex: 1,
        borderColor: DIJON_COLOR,
        borderStyle: 'dashed',
        borderWidth: 1
    }
});


type ImageOverlayProps = {
    image: Object
};

export default class ImageOverlay extends Component {
    constructor(props: ImageOverlayProps) {
        super(props);

        this.state = {
            isDragging: false,
            isScaling: false,
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
            rotation: new Animated.Value(0),
            initialPinch: null,
            overlayTouched: false
        };
    }

    componentWillMount() {
        // store the last values so we can reset the offsets after the user releases the drag
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this._scale = 1;

        this.state.pan.x.addListener(value => { this._animatedValueX = value.value; });
        this.state.pan.y.addListener(value => { this._animatedValueY = value.value; });

        this._pan = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: () => {
                // reset the offset to the previously stored values
                this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                this.state.pan.setValue({x: 0, y: 0});

                this._markTouched();
            },

            onPanResponderMove: (e, gesture) => this._handleMove(e, gesture),

            onPanResponderRelease: () => {
                this.state.pan.flattenOffset(); // Flatten the offset so it resets the default positioning
                this.setState({
                    isDragging: false,
                    isScaling: false,
                    initialPinch: null
                });
            }
        });
    }

    componentWillUnmount() {
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
    }

    props: ImageOverlayProps;

    _getTouchAngle(x1, y1, x2, y2) {
        const radians = Math.atan2((x1 - x2), (y1 - y2));
        const degrees = radians * (180 / Math.PI);
        return degrees;
    }

    _handleMove(e, gesture) {
        const touches = e.nativeEvent.touches;
        const {dx, dy} = gesture;

        if (touches.length === 1) {
            this.setState({ isDragging: true });
            this._handleDrag(dx, dy);

        } else if (touches.length === 2) {
            const [touch1, touch2] = touches;
            const {pageX: x1, pageY: y1} = touch1;
            const {pageX: x2, pageY: y2} = touch2;

            this._handleRotate(x1, y1, x2, y2);
            this._handlePinchZoom(x1, y1, x2, y2);
        }
    }

    _handleDrag(x, y) {
        this.state.pan.x.setValue(x);
        this.state.pan.y.setValue(y);
    }

    _handleRotate(x1, y1, x2, y2) {
        const {initialPinch, rotation} = this.state;
        if (initialPinch) {
            if (initialPinch.angle === null) {
                initialPinch.angle = rotation._value;
            }

            const {x1: x1_, y1: y1_, x2: x2_, y2: y2_} = initialPinch;
            const initialDegrees = this._getTouchAngle(x1_, y1_, x2_, y2_);
            const degrees = this._getTouchAngle(x1, y1, x2, y2);

            const startOffset = initialPinch.angle + initialDegrees;

            this.state.rotation.setValue((-degrees + startOffset) % 360);
        }
    }

    _handlePinchZoom(x1, y1, x2, y2) {
        const {initialPinch} = this.state;

        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        const distance = Math.sqrt((dx * dx) + (dy * dy));

        const initialDistance = initialPinch ? initialPinch.distance : distance;
        const distanceDiff = distance - initialDistance;
        const scale = (INITIAL_SIZE + distanceDiff) / INITIAL_SIZE;

        if (!initialPinch) {
            this.setState({
                isScaling: true,
                initialPinch: { x1, y1, x2, y2, distance, angle: null }
            });

            this._scale = this.state.scale._value;
        }

        const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

        Animated.spring(
            this.state.scale,
            { toValue: clamp(scale * this._scale, 0.6, 4), friction: 4 }
        ).start();
    }

    _markTouched() {
        if (!this.state.overlayTouched) {
            this.setState({ overlayTouched: true });
        }
    }

    render() {
        const {image} = this.props;
        const pan = this._pan;
        const {
            isDragging, isScaling, overlayTouched,
            scale, rotation
        } = this.state;
        const {x, y} = this.state.pan;
        const spin = rotation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });

        const imageStyle = {
            transform: [
                { translateX: x },
                { translateY: y },
                { rotate: spin },
                { scale }
            ]
        };
        const dragStyle = isDragging ? styles.dragging : null;
        const scaleStyle = isScaling ? styles.scaling : null;
        const untouchedStyle = !overlayTouched ? styles.untouchedBorder : null;

        return (
            <View style={styles.drag}>
                <Animated.View
                    style={[imageStyle, dragStyle, scaleStyle, untouchedStyle]}
                    {...pan.panHandlers}
                >
                    <Image
                        source={image}
                        style={styles.image}
                    />
                </Animated.View>
            </View>
        );
    }
}
