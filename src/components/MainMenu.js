import React from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import MenuItem from './MenuItem';
import PDP from './PDP';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    }
});

type MainMenuProps = {
    items: Array<Object>,
    navigator: Object
};

export default function MainMenu({ items, navigator }: MainMenuProps) {
    const navigateToItem = item => {
        navigator.push({
            title: item.title || 'Selected',
            component: PDP,
            passProps: {
                item
            }
        });
    };

    return (
         <ScrollView contentContainerStyle={styles.container}>
            {items.map(item => {
                const { title, imageSource } = item;

                return (
                    <MenuItem
                        imageSource={imageSource}
                        key={title}
                        title={title}
                        onPress={() => navigateToItem(item)}
                    />
                );
            })}
        </ScrollView>
    );
}
