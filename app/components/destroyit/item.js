import React, {Component} from 'react';
import {Animated} from 'react-native';

export default class Item extends Component {
    render() {
        return (
            <Animated.Image source={this.props.itemImg}
                style={{
                    height: 100,
                    width: 50,
                    position: 'absolute',
                    resizeMode: 'stretch',
                    left: this.props.itemStartPosX,
                    transform: [
                        {translateY: this.props.moveItemVal}
                    ]
                }}
            ></Animated.Image>
        );
    }
}