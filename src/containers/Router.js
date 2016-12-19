import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    NavigatorIOS
} from 'react-native'

import MainMenu from '../components/MainMenu';
import { setActiveItem } from '../actions';

class Router extends Component {
    render() {
        const { activeItem, items, setActiveItem } = this.props;
        return (
            <NavigatorIOS
                initialRoute={{
                    title: "Items",
                    component: MainMenu,
                    passProps: {
                        activeItem,
                        items,
                        viewItem: setActiveItem
                    }
                }}
                style={{flex: 1}}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
        activeItem: state.activeItem
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
