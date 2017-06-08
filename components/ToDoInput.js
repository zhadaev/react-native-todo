import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import ToDoModel from '../database/ToDoModel';

class TodoInput extends Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate(){
		if(this.props.inputFocus){
			this.refs.editTask.focus();
		}
	}

	render() {
		return (
			<View style={styles.inputWrapper}>
				<TextInput
					ref={'editTask'}
					multiline={true}
					placeholder={this.props.placeholder}
					underlineColorAndroid='#007aff'
					onChangeText={text => this.props.onInputChange.call(this, text)}
					style={styles.inputField}
					value={this.props.inputValue}
					/>
				<TouchableOpacity style={styles.addBtn}
					onPress={this.props.onAddTask}
					>
					<Text style={styles.addBtnText}>{this.props.addBtnText}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputWrapper: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputField: {
		flex: 4,
		fontSize: 18,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 10,
	},
	addBtn: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#007aff',
		backgroundColor: '#fff'
	},
	addBtnText: {
		paddingVertical: 12,
		fontSize: 16,
		fontWeight: '600',
		color: '#007aff',
		alignSelf: 'stretch',
		textAlign: 'center',

	}
});

export default TodoInput;