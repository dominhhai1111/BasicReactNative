import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Button,
	Alert,
	Text,
} from 'react-native';

export default class QuicklyGame extends Component<Props> {
	static navigationOptions = {
		title: 'Quickly'
	};
	
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<Text>Hello</Text>
		);	
	}
}