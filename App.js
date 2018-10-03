/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class Fruit extends Component {
  constructor(props) {
    super(props);
    this.state = {isDefaultColor: true};

    setInterval(() => {
      this.setState(state => {
        return {isDefaultColor: !state.isDefaultColor};
      });
    }, 1000);
  }
  render() {
    let color = this.state.isDefaultColor ? styles.black : styles.red;
    return (
        <Text style={color}>They are {this.props.name}</Text>
    );
  }
}

class Square extends Component {
  constructor(props) {
    super(props);
    let value = Math.floor(Math.random()*10);
    this.state = {isDisplay: true, value: value, time: 5000};

    setInterval(() => {
      this.setState(state => {
        let randomTime = Math.floor(Math.random()*1000);
        return {isDisplay: !state.isDisplay, time: randomTime};
      });
    }, this.state.time);
  }
  render() {
    let display = this.state.isDisplay ? this.state.value : '';
    return (
        <View style={styles.square}>
          <Text style={styles.number}>{display}</Text>
        </View>
    );
  }
}

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  alertMessage() {
    Alert.alert("You kick me !!")
  }

  render() {
    let pic = {
          uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
    return (
        /*<View style={{alignItems: 'center'}}>
          <Image source={pic} style={{width: 193, height: 110}}/>
          <Fruit name='bananas'/>
        </View>*/

        <View style={{flexDirection: 'column'}}>
          <View>
            <Square></Square>
            <Square></Square>
          </View>
          <Button title="Press me" onPress={this.alertMessage}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  red: {
    color: 'red'
  },
  black: {
    color: 'black'
  },
  square: {
    alignItems: 'center',
    width: 200,
    height: 200,
    backgroundColor: 'blue'
  },
  number: {
    color: 'white',
    fontSize: 100
  }
});
