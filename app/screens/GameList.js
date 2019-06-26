/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, Button, FlatList, StyleSheet} from 'react-native';

export default class App extends Component {
    static navigationOptions = {
        title: 'Game List'
    }
    render() {
        var {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Racing Game', link: 'RacingGame'},
                        {key: 'Destroy It', link: 'DestroyItGame'},
                        {key: 'Quickly', link: 'QuicklyGame'},
                        {key: 'Test', link: 'Test'}
                    ]}
                    renderItem={({item}) => <Text style={styles.item} onPress={() => navigate(item.link, {})}>{item.key}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    item: {
        backgroundColor: '#eee600',
        height: 50,
        textAlignVertical: 'center',
        paddingLeft: 20,
        fontWeight: 'bold'
    }
});
