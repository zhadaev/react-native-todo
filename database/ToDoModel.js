import Realm from 'realm';

let ToDoModel = new Realm({
	schema: [{name: 'Note', properties: {id: 'int', task: 'string', done: 'bool'}}]
});

export default ToDoModel;