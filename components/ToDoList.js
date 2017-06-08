import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Keyboard } from 'react-native';

import ToDoModel from '../database/ToDoModel';
import ToDoItem from './ToDoItem';
import ToDoInput from './ToDoInput';

import { ListView } from 'realm/react-native';

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: this.setSource(),
            inputValue: '',
            taskId: null,
            inputFocus: false,
            addBtnText: 'Add'
        }
    }

    setSource(){
        let Notes = ToDoModel.objects('Note').sorted('id', true);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return dataSource.cloneWithRows(Notes)
    }

    onAddTask(task){
        if(task.match(/^\s*$/)) {
            alert('Type your task at first');
            this.setState({inputValue: ''});
            return;
        }

        if(this.state.taskId){
            var editableTask = ToDoModel.objects('Note').filtered('id = "' + this.state.taskId + '"');
            ToDoModel.write( () => {
                editableTask[0]['task'] = task.trim();
            });
        } else {
            let id = new Date().getTime();

            ToDoModel.write(() => {
                ToDoModel.create('Note', {id: id, task: task.trim(), done: false});
            });
        }

		this.setState({
            inputValue: '',
            taskId: undefined,
            dataSource: this.setSource(),
            inputFocus: false,
            addBtnText: 'Add'
        });
		Keyboard.dismiss();
	}

    onItemComplete(id){
        let completeTask = ToDoModel.objects('Note').filtered('id = "' + id + '"');

        ToDoModel.write( () => {
            completeTask[0]['done'] = !completeTask[0]['done'];
        });

        this.setState({
            dataSource: this.setSource()
        });
    }

    removeTask(id){
        let noteToRemove = ToDoModel.objects('Note').filtered('id = "' + id + '"');

        ToDoModel.write( () => {
            ToDoModel.delete( noteToRemove );
        });

        this.setState({
            dataSource: this.setSource(),
            inputValue: '',
            taskId: null,
            inputFocus: false,
        });
    }

    editTask(id, task){
        this.setState({
            inputValue: task,
            taskId: id,
            inputFocus: true,
            addBtnText: 'Save'
        });
    }

    renderRow(todo) {
        return (
            <ToDoItem
                key={todo.id}
                task={todo.task}
                done={todo.done}
                onItemComplete={this.onItemComplete.bind(this, todo.id)}
                removeNote={this.removeTask.bind(this, todo.id)}
                editTask={this.editTask.bind(this, todo.id, todo.task)}
            />
        );
    }

    render() {
        return (
            <View>
                <ToDoInput
                    onInputChange={text => this.setState({inputValue: text})}
                    onAddTask={this.onAddTask.bind(this, this.state.inputValue)}
                    inputValue={this.state.inputValue}
                    placeholder={'> add todo'}
                    inputFocus={this.state.inputFocus}
                    addBtnText={this.state.addBtnText}
                    />
                <ScrollView>
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    toDoList: {},
});

export default ToDoList;
