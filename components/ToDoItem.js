import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput } from 'react-native';

class ToDoItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.todoItem}>
				<View style={styles.switchToDo}>
					<Switch
            onValueChange={this.props.onItemComplete}
            value={this.props.done}
          />
				</View>
				<Text style={[styles.toDoText, this.props.done && styles.doneItem]}>{this.props.task}</Text>
				<TouchableOpacity style={styles.editBtn} onPress={this.props.editTask}>
					<Text style={styles.editBtnText}>✐</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.removeToDo} onPress={this.props.removeNote}>
					<Text style={styles.removeToDoText}>❌</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	todoItem: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
	},
	switchToDo: {
		flex: 1,
        paddingHorizontal: 5,
		alignSelf: 'center',
		justifyContent: 'flex-start'

	},
	toDoText: {
		padding: 10,
		flex: 4,
		fontSize: 18,
		alignSelf: 'center',
	},
	removeToDo: {
		flex: 1,
        alignSelf: 'center',
	},
	removeToDoText: {
		fontSize: 20,
		lineHeight: 20,
		alignSelf: 'center'
	},
	editBtn: {
		flex: 1,
        alignSelf: 'center',
	},
	editBtnText: {
		fontSize: 25,
		lineHeight: 20,
		alignSelf: 'center',
		color: '#333'
	},
	doneItem: {
        textDecorationLine: 'line-through'
	}
});

export default ToDoItem;