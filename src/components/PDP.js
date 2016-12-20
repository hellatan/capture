import React, { Component, PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    TabBarIOS,
    Text,
    TouchableHighlight
} from 'react-native';

import ItemViewer from './ItemViewer';

const buttonCopy = {
    'fashion': 'View on Person',
    'jewelry': 'View on Person',
    'art': 'View in Room',
    'furniture': 'View in Room'
};

const styles = StyleSheet.create({
    bgImage: {
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center',
        height: null,
        width: null
    }
});

export default function PDP({item, navigator}) {
    const navigateToCamera = () => {
        navigator.push({
            title: 'Take Snapshot',
            component: ItemViewer,
            passProps: {
                item
            }
        });
    };

    return (
        <Image source={item.pdpImageSource} style={styles.bgImage}>
            <TouchableHighlight onPress={() => navigateToCamera()}>
                <Text>
                    Go to camera view
                </Text>
            </TouchableHighlight>
            <TabBarIOS>
                <TabBarIOS.Item
                    icon={require('../assets/camera_icon_small.png')}
                    onPress={navigateToCamera}
                    title={buttonCopy[item.vertical] || 'Camera View'}
                />
            </TabBarIOS>
        </Image>
    );
}

PDP.propTypes = {
    item: PropTypes.shape({
        imageSource: PropTypes.number,
        pdpImageSource: PropTypes.number,
        title: PropTypes.string
    }).isRequired,
    navigator: PropTypes.object
};
