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
    Dimensions
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
        this.state = {
            selectText: 'all',
            selectColor: 'all',
            selectType: 'all',
            points: 10,
            itemSpeed: 4200,
            gameOver: false,
            items: []
        };

        this.itemValue = 0;
        this.items = [];
    }

    componentDidMount() {
        this.mounted = true;
        this.process();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    process() {
        this.getRandomSelection();
        this.createItem();
        /*this.intervalId = setInterval(() => {
            this.createItem();
        }, 1000);*/
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

    createItem() {
        var itemStartPosX = this.getItemStartPosX();
        var moveItemVal = new Animated.Value(this.itemValue);
        this.state.items.push(
            {itemStartPosX: itemStartPosX, moveItemVal: moveItemVal, itemValue: this.itemValue}
        );
        console.log(moveItemVal);
        console.log(moveItemVal._value);
        ++this.itemValue;
        Animated.timing(
            moveItemVal,{
                toValue: Dimensions.get('window').height,
                duration: this.state.itemSpeed
            }
        ).start(() => {
            this.removeItem(moveItemVal._value);
            if (this.itemValue == 1) {
                this.createItem();
            }
           // this.createItem();
        });
    }

    getItemStartPosX() {
        var width = Dimensions.get('window').width;
        var unit = width / 4;
        var defaultPosistions = [unit * 0.5, unit * 1.5, unit * 2.5, unit * 3.5];
        var positionX = defaultPosistions[Math.floor(Math.random() * defaultPosistions.length)];

        return positionX;
    }

    removeItem(value) {
        for(var i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].itemValue == value) {
                this.state.items.splice(i, 1);
                break;
            }
        }
    }

    render() {
        let items = this.state.items.map(( item, key ) => {
            return (
                <Item itemImg={require('../img/yellow_car_01.png')}
                      itemStartPosX={item.itemStartPosX}
                      moveItemVal={item.moveItemVal}
                      key={item.itemValue}>
                </Item>
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

