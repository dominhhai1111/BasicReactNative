import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    Animated,
    ImageBackground,
    Dimensions
} from 'react-native';

export default class Enemy extends Component {
    render() {
        return (
            <Animated.Image source={this.props.enemyImg}
                style={{
                    height: 200,
                    width: 100,
                    position: 'absolute',
                    resizeMode: 'stretch',
                    left: this.props.enemyStartPosX,
                    transform: [
                        {translateY: this.props.moveEnemyVal}
                    ]
                }}
            ></Animated.Image>
        );
    }
}