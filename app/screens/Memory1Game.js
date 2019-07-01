import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Alert,
	Container,
	Row,
	Col,
	Text
} from 'react-native';

export default class Memory1Game extends Component<Props> {
	static navigationOptions = {
		title: 'Memory 1'
	};

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<View class="d-flex p-3 bg-secondary text-white flex-wrap" sty>  
			    <View class="p-2 bg-info"><Text class='check'>X</Text></View>
			    <View class="p-2 bg-warning"></View>
			    <View class="p-2 bg-primary"></View>
		        <View class="p-2 bg-info"></View>
			    <View class="p-2 bg-warning"></View>
			    <View class="p-2 bg-primary"></View>
		        <View class="p-2 bg-info"></View>
			    <View class="p-2 bg-warning"></View>
			    <View class="p-2 bg-primary"></View>
			</View>
		);	
	}
}

const styles = {
 	container: {
        flex: 1,
        position: 'relative'
    },
};