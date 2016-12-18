import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import MenuItem from './MenuItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default function MainMenu({ items, viewItem }) {
    return (
         <View style={styles.container}>
            {items.map(item => {
                const { title, imageSource } = item;

                return (
                    <MenuItem
                        imageSource={imageSource}
                        key={title}
                        onPress={() => viewItem(item)}
                        title={title}
                    />
                );
            })}
        </View>
    );
}
