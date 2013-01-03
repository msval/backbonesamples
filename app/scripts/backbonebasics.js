var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	},
	initialize: function () {
		console.log('Model initialized');
		this.on('change', function () {
			console.log('Values for the model changed');
		});
		this.on('error', function(model, error) {
			console.log(error);
		});
	},
	validate: function (attribs) {
		if (attribs.title === '') {
			return "Remember to set a title for your todo";
		}
	}
});

var myTodo = new Todo();

myTodo.set('title', 'trigger on change');
console.log('title changed to ' + myTodo.get('title'));

myTodo.set('completed', true);
console.log('Completed has changed: ' + myTodo.get('completed'));

myTodo.set({
	title: 'Listener triggerd each time',
	completed: false
});

// this should cause validation error
var myInvalidTodo = new Todo();
myInvalidTodo.set('completed', false);

var TodoView = Backbone.View.extend({
	tagName: 'li',

	todoTpl: _.template($('#item-template').html()),

	events: {
		'dblclick label' : 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	render: function() {
		this.$el.html(this.todoTpl(this.model.toJSON()));
		this.input = this.$('.edit');
		return this;
	},

	edit: function () {

	},

	close: function () {

	},

	updateOnEnter: function (e) {

	}
});

var todoView = new TodoView();

console.log(todoView.el);