import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import ItemViewer from './ItemViewer';

const { height, width } = Dimensions.get('window');
const viewTypes = {
    CAMERA: 'camera_view',
    PDP: 'pdp_view'
};

const styles = StyleSheet.create({
    bgImage: {
        height,
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class PDP extends Component {
    constructor(props) {
        super(props);

        this.renderPdpView = this.renderPdpView.bind(this);
        this.renderCameraView = this.renderCameraView.bind(this);

        this.state = {
            currentView: viewTypes.PDP
        };
    }

    setView(view) {
        return () => this.setState({ currentView: view });
    }

    renderCameraView() {
        return <ItemViewer item={this.props.item} exit={this.setView(viewTypes.PDP)} />;
    }

    renderPdpView() {
        return (
                <Image source={this.props.item.pdpImageSource} style={styles.bgImage}>
                    <TouchableHighlight onPress={this.setView(viewTypes.CAMERA)}>
                        <Text>
                            Go to camera view
                        </Text>
                    </TouchableHighlight>
                </Image>
        );
    }


    render() {
        return this.state.currentView === viewTypes.PDP ? this.renderPdpView() : this.renderCameraView();
    }
}

PDP.propTypes = {
    item: PropTypes.shape({
        imageSource: PropTypes.number,
        pdpImageSource: PropTypes.number,
        title: PropTypes.string
    }).isRequired,
    backToMenu: PropTypes.func.isRequired
};
