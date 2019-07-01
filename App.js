import React, {Component} from 'react';
import {Text, View, YellowBox } from 'react-native';

import {createStackNavigator} from 'react-navigation';
import GameList from './app/screens/GameList';
import RacingGame from './app/screens/RacingGame';
import DestroyItGame from './app/screens/DestroyItGame';
import QuicklyGame from './app/screens/QuicklyGame';
import Memory1Game from './app/screens/Memory1Game';
import Test from './app/screens/Test';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Navigetion = createStackNavigator({
        GameList: {screen: GameList},
        RacingGame: {screen: RacingGame},
        DestroyItGame: {screen: DestroyItGame},
        QuicklyGame: {screen: QuicklyGame},
        Memory1Game: {screen: Memory1Game},
        Test: {screen: Test}
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#eec051'
            },
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: 'bold'
            }
        }
    });
export default Navigetion;