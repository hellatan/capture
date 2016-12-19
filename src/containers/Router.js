import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainMenu from '../components/MainMenu';
import PDP from '../components/PDP';
import { setActiveItem } from '../actions';

class Router extends Component {
    constructor(props) {
        super(props);

        this.goToMainMenu = this.goToMainMenu.bind(this);
    }

    goToMainMenu() {
        this.props.setActiveItem(null);
    }

    render() {
        const { activeItem, items } = this.props;
        return activeItem
             ? <PDP item={activeItem} backToMenu={this.goToMainMenu} />
             : <MainMenu items={items} viewItem={this.props.setActiveItem} />;
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
