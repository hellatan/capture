// @flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';


const styles = StyleSheet.create({
    drag: {
        width: 100,
        height: 100
    },
    overlay: {
        position: 'absolute'
    },
    text: {
        color: '#f00'
    }
});

type ImageOverlayProps = {
    pan: Object,
    pos: Object
};

export default class ImageOverlay extends Component {
    props: ImageOverlayProps;

    render() {
        const {pan, pos} = this.props;
        const [translateX, translateY] = [pos.x, pos.y];

        const imageStyle = {transform: [{translateX}, {translateY}]};

        return (
            <View style={styles.drag}>
                <Animated.View
                    style={[imageStyle]}
                    {...pan.panHandlers}
                >
                    <Text style={styles.text}>eventually we can drag this</Text>
                </Animated.View>
            </View>
        );
    }
}
