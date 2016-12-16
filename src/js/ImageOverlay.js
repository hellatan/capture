// @flow

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 100,
        left: 100
    }
});

export default class ImageOverlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.overlay}>
                <Text>eventually we can drag this</Text>
            </View>
        );
    }
}
