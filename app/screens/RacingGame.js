/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import Enemy from '../components/racinggame/enemy';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type
Props = {};

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
        let value = Math.floor(Math.random() * 10);
        this.state = {isDisplay: true, value: value, time: 5000};

        setInterval(() => {
            this.setState(state => {
                let randomTime = Math.floor(Math.random() * 1000);
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

export default class RacingGame extends Component<Props> {
    static navigationOptions = {
        title: 'Racing Game'
    }

    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,

            movePlayerVal: new Animated.Value(40),
            playerSide: 'left',
            points: 0,

            moveEnemyVal: new Animated.Value(0),
            enemyStartPosX: 0,
            enemySide: 'left',
            enemySpeed: 4000,

            gameOver: false
        };
    }

    alertMessage() {
        Alert.alert("You kick me !!")
    }

    onSwipe(gestureName, gestureState) {
        if (gestureState.dx > 0) {
            this.movePlayer('right');
        } else {
            this.movePlayer('left');
        }
    }

    movePlayer(direction) {
        if (direction == 'right') {
            this.setState({playerSide: 'right'});

            Animated.spring(
                this.state.movePlayerVal, {
                    toValue: Dimensions.get('window').width - 150,
                    tension: 120
                }
            ).start();
        } else {
            this.setState({playerSide: 'left'});

            Animated.spring(
                this.state.movePlayerVal, {
                    toValue: 40,
                    tension: 120
                }
            ).start();
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.animateEnemy();
    }

    componentWillUnmount() {
        this.mounted = false;
        Animated.timing(this.state.moveEnemyVal).stop();
        clearInterval(this.refreshIntervalId);
        clearInterval(this.speedIntervalId);
    }

    animateEnemy() {
        if (this.mounted) {
                    this.state.moveEnemyVal.setValue(-100);
        var windowHeight = Dimensions.get('window').height;

        var random = Math.floor(Math.random() * 2) + 1;
        var position = 40;
        if (random == 2) {
            position = 40;
            this.setState({enemySide: 'left'});
        } else {
            this.setState({enemySide: 'right'});
            position = Dimensions.get('window').width - 150;
        }
        this.setState({ enemyStartPosX: position});

        this.refreshIntervalId = setInterval(() => {
            if (this.state.moveEnemyVal._value > windowHeight - 450
                && this.state.moveEnemyVal._value < windowHeight - 100
                && this.state.playerSide == this.state.enemySide) {
                this.setState({gameOver: true});
                Animated.timing(this.state.moveEnemyVal).stop();
                this.gameOver();
                clearInterval(this.refreshIntervalId);
            }
        }, 50);

        // Increase speed enemy
        this.speedIntervalId = setInterval(() => {
            this.setState({enemySpeed: this.state.enemySpeed - 10});
        }, 1000);

        Animated.timing(
            this.state.moveEnemyVal,{
                toValue: Dimensions.get('window').height,
                duration: this.state.enemySpeed
            }
        ).start(() => {
            //alert(this.state.gameOver);
            if (this.mounted) {
                if (this.state.gameOver == false) {
                    clearInterval(this.refreshIntervalId);
                    this.setState({points: ++this.state.points});
                    this.animateEnemy();
                }
            }
        });
        }
    }

    gameOver() {
        Alert.alert(
            'Gameover',
            'Play again',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.resetGame()},
            ],
            { cancelable: false }
        )
    }

    resetGame() {
        this.setState({
            movePlayerVal: new Animated.Value(40),
            playerSide: 'left',
            points: 0,

            moveEnemyVal: new Animated.Value(0),
            enemyStartPosX: 0,
            enemySide: 'left',
            enemySpeed: 4200,

            gameOver: false
        });

        this.animateEnemy();
    }

    render() {
        /*let pic = {
              uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
            };*/
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            /*<View style={{alignItems: 'center'}}>
              <Image source={pic} style={{width: 193, height: 110}}/>
              <Fruit name='bananas'/>
            </View>*/
            /*<View style={{flexDirection: 'column'}}>
              <View>
                <Square></Square>
                <Square></Square>
              </View>
              <Button title="Press me" onPress={this.alertMessage}/>
            </View>*/

            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={config}
                style={{
                    flex: 1
                }}
            >
                <ImageBackground source={require('../img/bg.png')} style={styles.container}>

                    <View style={{flex: 1, alignItems: 'center', marginTop: 80}}>
                        <View style={styles.points}>
                            <Text style={{fontWeight: 'bold', fontSize: 40}}>{this.state.points}</Text>
                        </View>
                    </View>

                    <Animated.Image source={require('../img/red_car.png')}
                                    style={{
                                        height: 200,
                                        width: 100,
                                        position: 'absolute',
                                        zIndex: 1,
                                        bottom: 50,
                                        resizeMode: 'stretch',
                                        transform: [
                                            {translateX: this.state.movePlayerVal}
                                        ]
                                    }}></Animated.Image>

                    <Enemy enemyImg={require('../img/yellow_car_01.png')}
                           enemyStartPosX={this.state.enemyStartPosX}
                           moveEnemyVal={this.state.moveEnemyVal}>
                    </Enemy>

                </ImageBackground>
            </GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
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
    },
    controls: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    left: {
        flex: 1,
        color: '#FFF',
        marginRight: 10,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    right: {
        flex: 1,
        color: '#FFF',
        marginLeft: 10,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    points: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
