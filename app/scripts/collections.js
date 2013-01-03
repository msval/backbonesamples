var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	}
});

var TodosCollection = Backbone.Collection.extend({
	model: Todo,
	localStorage: new Store('todos-backbone')
});

var myTodo = new Todo({title: 'Read the whole book', id: 2});

var todos = new TodosCollection([myTodo]);

console.log("Collections size: " + todos.length);

todos.create({title: 'Try out code samples', id: 48});
console.log("Collections size: " + todos.length);