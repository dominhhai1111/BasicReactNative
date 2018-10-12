import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Item from '../components/destroyit/item';

export default class DestroyItGame extends Component<Props> {
    static navigationOptions = {
        title: 'Test'
    };

    onPress = () => {
        console.log(123);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={this.onPress}
                >
                    <Text> Touch Here </Text>
                </TouchableHighlight>

                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        height: 100,
                        width: 50,
                        position: 'absolute',
                        zIndex: 1,
                        top: 100,
                        left: 100,
                    }}
                >
                    <Image source={require('../img/yellow_car_01.png')}
                           onPress={this.onPress}
                           style={{
                               height: 100,
                               width: 50,
                               resizeMode: 'stretch'
                           }}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    }
})