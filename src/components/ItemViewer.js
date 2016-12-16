import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ItemView({ item, exit }) {
    return (
        <Text>{item}</Text>
    );
}
