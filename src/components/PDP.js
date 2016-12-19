import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    TabBarIOS,
    Text,
    TouchableHighlight
} from 'react-native';

import ItemViewer from './ItemViewer';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    bgImage: {
        height,
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
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
                    icon={require('../assets/camera_small.png')}
                    onPress={navigateToCamera}
                    title="Camera View"
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
