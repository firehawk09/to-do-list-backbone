;
(function(exports) {
    "use strict";

    Backbone.TodoRouter = Backbone.Router.extend({

        initialize: function() {
            console.log("initialized");
            this.collection = new Backbone.TodoActualList();
            this.view1 = new Backbone.TodoView({
                collection: this.collection
            });
            // this.view2 = new Backbone.TodoViewDetail({collection: this.collection });
            Backbone.history.start();
        },
        routes: {
            "*default": "home"
        },
        home: function() {
            this.view1.render();
            // this.view2.render(); //Temporary: we'll move the detail view later

        }
    })

    Backbone.TodoModel = Backbone.Model.extend({
        defaults: {
            "checked": "false",
            "title": "No title given.",
            "done": "false"
        },
        validate: function(data) {
            // debugger;
            var x = data.title.length > 0;

            // debugger;
            if (!x) {
                return "Title Required.";
            }
        }
    })

    Backbone.TodoActualList = Backbone.Collection.extend({
        model: Backbone.TodoModel
    })

    Backbone.TodoView = Backbone.TemplateView.extend({
        el: ".container1",
        view: "todoList",
        events: {
            "submit .addItemForm": "addItem",
            "click .data": "showDetail"
        },
        addItem: function(event) {
            event.preventDefault();
            var x = {
                title: this.el.querySelector("input[name = 'John']").value
            }
            this.collection.add(x, {
                validate: true
            });
            console.log("Yay!");
            // debugger;
        },
        checked: function() {

        },
        showDetail: function(event){
            event.preventDefault();
            console.log(event.target.innerHTML);
            // debugger;
            console.log("List Item Clicked");
        }
    })

    Backbone.TodoViewDetail = Backbone.TemplateView.extend({
        el: ".container2",
        view: "todoDetails"
    })

})(typeof module === "object" ? module.exports : window)
