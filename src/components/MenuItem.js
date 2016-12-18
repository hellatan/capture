import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100
    }
});

export default function MenuItem({ imageSource, onPress, title }) {
    return (
        <View style={styles.wrapper}>
            <TouchableHighlight onPress={onPress}>
                <Text>{title}</Text>
            </TouchableHighlight>
            <Image style={styles.image} source={imageSource} />
        </View>
    );
}
