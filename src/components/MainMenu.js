import React from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import MenuItem from './MenuItem';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    }
});

export default function MainMenu({ items, viewItem }) {
    return (
         <ScrollView contentContainerStyle={styles.container}>
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
        </ScrollView>
    );
}
