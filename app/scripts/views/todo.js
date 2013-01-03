/*global Backbone:false, _:false, $:false*/
'use strict';
var app = app || {};

var ENTER_KEY = 13;

app.TodoView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#item-template').html() ),

	events: {
		'click .toggle': 'togglecompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function() {
		this.model.on( 'change', this.render, this );
		this.model.on( 'destroy', this.remove, this );
		this.model.on( 'visible', this.toggleVisible, this );
	},

	render: function() {
		this.$el.html( this.template (this.model.toJSON() ) );
		this.$el.toggleClass( 'completed', this.model.get('completed') );

		this.toggleVisible();
		this.input = this.$('.edit');
		return this;
	},

	toggleVisible : function () {
		this.$el.toggleClass( 'hidden', this.isHidden());
	},

	isHidden: function () {
		var isCompleted = this.model.get('completed');
		return (
			(!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
		);
	},

	togglecompleted: function() {
		this.model.toggle();
	},

	edit: function() {
		this.$el.addClass('editing');
		this.input.focus();
	},

	close: function() {
		var value = this.input.val().trim();

		if ( value ) {
			this.model.save({ title: value } );
		} else {
			this.clear();
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
		if (e.wich === ENTER_KEY ) {
			this.close();
		}
	},

	clear: function() {
		this.model.destroy();
	}
});