import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

import ToDoList from './components/ToDoList';
import ToDoItem from './components/ToDoItem';
import ToDoInput from './components/ToDoInput';
import Realm from 'realm';
import ToDoModel from './database/ToDoModel';

class App extends Component {
  constructor(props){
    super(props);   
  }

	render() {
		return (
			<View style={{paddingBottom: 20}}>		
				<ToDoList />
			</View>
		);
	}
}

export default App;