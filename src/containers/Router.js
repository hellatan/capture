import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ItemViewer from '../components/ItemViewer';
import MainMenu from '../components/MainMenu';
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
             ? <ItemViewer item={activeItem} exit={this.goToMainMenu} backToMenu={() => this.props.setActiveItem(null)} />
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
