// @flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PanResponder,
    Animated
} from 'react-native';


const AnimatedView = Animated.View;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 100,
        left: 100
    },
    text: {
        color: '#f00'
    }
});

type ImageOverlayProps = {
    pan: Object
};

export default class ImageOverlay extends Component {
    constructor(props: ImageOverlayProps) {
        super(props);

        console.log(props);
        this.state = {
            dragging: false,
            pos: new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                console.log("GGGGGGGGGGG", gesture, "LLLLL", this.state.pos.getLayout());
                return Animated.event([null, {
                    dx: this.state.pos.x,
                    dy: this.state.pos.y
                }]);
            },
            onPanResponderRelease: (e, gesture) => {}
        });
    }

    props: ImageOverlayProps;

    startDrag() {

    }

    stopDrag() {

    }

    render() {
        return (
            <View style={styles.overlay}>
                <AnimatedView
                    {...this.panResponder.panHandlers}
                    style={[this.state.pos.getLayout()]}
                >
                    <Text style={styles.text}>eventually we can drag this</Text>
                </AnimatedView>
            </View>
        );
    }
}
