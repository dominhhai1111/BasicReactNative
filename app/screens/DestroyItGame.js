import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Alert,
    Animated,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Item from '../components/destroyit/item';

export default class DestroyItGame extends Component<Props> {
    static navigationOptions = {
      title: 'Destroy it'
    };

    constructor(props) {
        super(props);
        this.types = ['car', 'plane', 'rocket', 'spaceship'];
        this.carColors = ['red', 'yellow'];
        this.planeColors = ['black', 'red'];
        this.rocketColors = ['black', 'red'];
        this.spaceshipColors = ['black', 'red'];
        this.state = {
            selectText: 'all',
            selectColor: 'all',
            selectType: 'all',
            points: 10,
            gameOver: false,
            number: 0,
            items: []
        };

        this.items = [];

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.process();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.gameOver();
    }

    process() {
        if (this.mounted) {
            this.getRandomSelection();
            this.intervalCreateItemId = setInterval(() => {
                if (this.state.items.length < 10) {
                    this.createItem();
                }
            }, 1000);
            this.intervalUpdateItemId = setInterval(() => {
                this.updateItem();
            }, 5);
            this.intervalRandomSelectionId = setInterval(() => {
                this.getRandomSelection();
            }, 5000);
        }
    }

    gameOver() {
        this.setState({gameOver: true});
        clearInterval(this.intervalCreateItemId);
        clearInterval(this.intervalUpdateItemId);
        clearInterval(this.intervalRandomSelectionId);

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
            selectText: 'all',
            selectColor: 'all',
            selectType: 'all',
            points: 10,
            gameOver: false,
            number: 0,
            items: []
        });
        this.process();
    }

    getRandomSelection() {
        var color = '';
        var type = this.types[Math.floor(Math.random() * this.types.length)];
        switch (type) {
            case "car": color =  this.carColors[Math.floor(Math.random() * this.carColors.length)]; break;
            case "plane": color =  this.planeColors[Math.floor(Math.random() * this.planeColors.length)]; break;
            case "rocket": color =  this.rocketColors[Math.floor(Math.random() * this.rocketColors.length)]; break;
            case "spaceship": color =  this.spaceshipColors[Math.floor(Math.random() * this.spaceshipColors.length)]; break;
        }
        var select = color + ' ' + type;
        this.setState({selectText: select, selectColor: color, selectType: type});
    }

    getSourceImage(type, color) {
        var source = '';
        if (type == 'car') {
            if (color == 'red') {
                source = require('../img/destroyit/car_red.png');
            } else if (color == 'yellow') {
                source = require('../img/destroyit/car_yellow.png');
            }
            
        } else if (type == 'plane') {
            if (color == 'red') {
                source = require('../img/destroyit/plane_red.png');
            } else if (color == 'black') {
                source = require('../img/destroyit/plane_black.png');
            }
        } else if (type == 'rocket') {
            if (color == 'red') {
                source = require('../img/destroyit/rocket_red.png');
            } else if (color == 'black') {
                source = require('../img/destroyit/rocket_black.png');
            }
        } else if (type == 'spaceship') {
            if (color == 'red') {
                source = require('../img/destroyit/spaceship_red.png');
            } else if (color == 'black') {
                source = require('../img/destroyit/spaceship_black.png');
            }
        }

        return source;
    }

    createItem() {
        var itemStartPosX = this.getItemStartPosX();
        var itemSpeed = Math.floor(Math.random() * 2 + 1);
        var color = '';
        var type = this.types[Math.floor(Math.random() * this.types.length)];
        var height = 60;
        var width = 60;
        switch (type) {
            case "car":
                color =  this.carColors[Math.floor(Math.random() * this.carColors.length)];
                height = 100;
                width = 50;
                break;
            case "plane":
                color =  this.planeColors[Math.floor(Math.random() * this.planeColors.length)];
                height = 60;
                width = 60;
                break;
            case "rocket":
                color =  this.rocketColors[Math.floor(Math.random() * this.rocketColors.length)];
                height = 50;
                width = 50;
                break;
            case "spaceship":
                color =  this.spaceshipColors[Math.floor(Math.random() * this.spaceshipColors.length)];
                height = 60;
                width = 60;
                break;
        }
        var source = this.getSourceImage(type, color);
        var items = this.state.items;
        items.push(
            {startPosX: itemStartPosX, speed: 5, nowPositionY: 0, number: this.state.number, color: color, type: type, source: source, height: height, width}
        );

        ++this.state.number;
        this.setState({items});
    }

    updateItem() {
        var items = [];
        if (this.state.items.length > 0) {
            for (var i = 0; i < this.state.items.length; i++) {
                var item = this.state.items[i];
                if (this.checkPosition(item.nowPositionY)) {
                    item.nowPositionY += item.speed;
                    items.push(item);
                }
            }
        }

        this.setState({items});
    }

    checkPosition(positionY) {
        var height = Dimensions.get('window').height;
        if (positionY > height) {
            return false;
        }

        return true;
    }

    getItemStartPosX() {
        var width = Dimensions.get('window').width;
        var unit = width / 4;
        var defaultPosistions = [unit * 0.5, unit * 1.5, unit * 2.5, unit * 3.5];
        var positionX = defaultPosistions[Math.floor(Math.random() * defaultPosistions.length)];

        return positionX;
    }

    checkPoint(key) {
        var increasePoint = false;
        if (this.state.items[key].type == this.state.selectType
            && this.state.items[key].color == this.state.selectColor) {
            increasePoint = true;
        } else if (this.state.selectType == 'all'
            && this.state.items[key].color == this.state.selectColor) {
            increasePoint = true;
        } else if (this.state.selectColor == 'all'
            && this.state.items[key].type == this.state.selectType) {
            increasePoint = true;
        } else if (this.state.selectType == 'all'
            && this.state.selectColor == 'all') {
            increasePoint = true;
        }

        if (increasePoint) {
            this.setState({points: ++this.state.points});
        } else {
            this.setState({points: --this.state.points});
        }

        if (this.state.points == 0) {
            this.gameOver();
        }
        
    }

    onPress(key) {
        this.checkPoint(key);
    }

    render() {
        let items = this.state.items.map(( item, key ) => {
            return (
                <TouchableOpacity
                    onPress={() => this.onPress(key)}
                    key={item.number}
                    style={{
                        height: 100,
                        width: 50,
                        position: 'absolute',
                        zIndex: 1,
                        top: item.nowPositionY,
                        left: item.startPosX,
                    }}
                >
                    <Image source={item.source}
                           style={{
                               height: 100,
                               width: 50,
                               resizeMode: 'stretch'
                           }}>
                    </Image>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.container}>
                <Text style={styles.selectText}>Item: {this.state.selectText}</Text>
                <Text style={styles.selectText}>Point: {this.state.points}</Text>
                {items}
            </View>
        );
    }
};

const styles = {
    container: {
        flex: 1,
        position: 'relative'
    },
    selectText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
};

