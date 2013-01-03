/*global $:false, _:false, Backbone:false, ENTER_KEY:false*/
'use strict';
var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#todoapp',

	statsTemplate: _.template( $('#stats-template').html() ),

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	initialize: function() {
		this.input = this.$('#new-todo');
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		window.app.Todos.on( 'add', this.addAll, this);
		window.app.Todos.on( 'reset', this.addAll, this);
		window.app.Todos.on( 'change:completed', this.filterOne, this);
		window.app.Todos.on( 'filter', this.filterAll, this);
		window.app.Todos.on( 'all', this.render, this);

		app.Todos.fetch();
	},

	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if ( app.Todos.length ) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + ( app.TodoFilter || '') + '"]')
				.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;
	},

	addOne: function( todo) {
		var view = new app.TodoView({ model: todo});
		$('#todo-list').append( view.render().el);
	},

	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each( this.addOne, this);
	},

	filterOne: function( todo) {
		todo.trigger('visible');
	},

	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},

	newAttributes: function() {
		return {
			title: this.input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	createOnEnter: function( e ) {
		if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes());
		this.input.val('');
	},

	clearCompleted: function() {
		_.each (window.app.Todos.completed(), function(todo) {
			todo.destroy();
		});

		return false;
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Todos.each(function( todo ) {
			todo.save({
				'completed': completed
			});
		});
	}
});

$(function() {
	new app.AppView();
});