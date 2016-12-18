import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import ItemViewer from './ItemViewer';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});

export default function PDP({ imageSource, exit }) {
    return (
        <View>
            <Image source={imageSource} style={styles.bgImage} />
        </View>
    );
}
