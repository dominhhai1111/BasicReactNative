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
        this.colors = ['all', 'red', 'yellow'];
        this.types = ['all', 'car'];
        this.defaultColors = ['red', 'yellow'];
        this.defaultTypes = ['car'];
        this.state = {
            selectText: 'all',
            selectColor: 'all',
            selectType: 'all',
            points: 10,
            gameOver: false,
            number: 0,
            items: []
        };

        this.itemValue = 0;
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

    gameOver() {
        this.setState({gameOver: true});
        clearInterval(this.intervalCreateItemId);
        clearInterval(this.intervalUpdateItemId);
        clearInterval(this.intervalRandomSelectionId);
    }

    getRandomSelection() {
        var color = this.colors[Math.floor(Math.random() * this.colors.length)];
        var type = this.types[Math.floor(Math.random() * this.types.length)];
        var select = color + ' ' + type;
        if (color == 'all') {
            select = type;
        }
        if (type == 'all') {
            select = color;
        }
        this.setState({selectText: select, selectColor: color, selectType: type});
    }

    getSourceImage(type, color) {
        var source = '';
        if (type == 'car' && color == 'red') {
            source = require('../img/destroyit/car_red.png');
        }

        if (type == 'car' && color == 'yellow') {
            source = require('../img/destroyit/car_yellow.png');
        }

        return source;
    }

    createItem() {
        var itemStartPosX = this.getItemStartPosX();
        var itemSpeed = Math.floor(Math.random() * 2 + 1);
        var color = this.defaultColors[Math.floor(Math.random() * this.defaultColors.length)];
        var type = this.defaultTypes[Math.floor(Math.random() * this.defaultTypes.length)];
        var source = this.getSourceImage(type, color);
        var items = this.state.items;
        items.push(
            {startPosX: itemStartPosX, speed: 5, nowPositionY: 0, number: this.state.number, color: color, type: type, source: source}
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

