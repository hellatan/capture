// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

import CameraView from './src/js/CameraView';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});


export default class capture extends Component {
    constructor(props) {
        super(props);

        this.camera = null;
    }

    _setCamera(ref) {
        this.camera = ref;
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraView />
            </View>
        );
    }
}

AppRegistry.registerComponent('capture', () => capture);
