import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import CameraView from '../js/CameraView';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faa'
    }
});

export default function ItemView({ item, exit }) {
    return (
        <View style={styles.container}>
            <CameraView />
        </View>
    );
}
