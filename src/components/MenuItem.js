import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100
    },
    imageContainer: {
        flex: 1,
        flexBasis: 50,
        alignItems: 'center'
    },
    labelContainer: {
        alignItems: 'center',
        flex: 1,
        flexBasis: 50,
        paddingRight: 35
    }
});

export default function MenuItem({ imageSource, onPress, title }) {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imageSource} />
                </View>
                <View style={styles.labelContainer}>
                    <Text>{title}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}
