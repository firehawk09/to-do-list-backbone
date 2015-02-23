;
(function(exports) {
    "use strict";

    Parse.TodoRouter = Parse.Router.extend({

        initialize: function() {
            console.log("initialized");
            this.collection = new Parse.TodoActualList();
            this.view1 = new Parse.TodoView({
                collection: this.collection
            });
            this.view2 = new Parse.TodoViewDetail({});
            Parse.history.start();
        },
        routes: {
            "*default": "home",
            "details/:item": "showDetail"
        },
        home: function() {
            this.view1.render();
            // this.view2.render(); //Temporary: we'll move the detail view later
        },
        showDetail: function(item) {
            // this.view2.render();
            console.log(item);
        }
    })

    Parse.TodoModel = Parse.Object.extend({
        className: "taskToDo",
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

    Parse.TodoActualList = Parse.Collection.extend({
        model: Parse.TodoModel

    //     querySelector = new Parse.Query(ParseTodo);
    //     todos.query = query;
    //     todos.fetch();
    })

    Parse.TodoView = Parse.TemplateView.extend({
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
        showDetail: function(event) {
            event.preventDefault();
            // find model
            var li = event.target.parentElement;
            var id = li.getAttribute('id');
            var model = this.collection.get(id);
            Parse.trigger("newModelForDetailView", model);
        }
    })

    Parse.TodoViewDetail = Parse.TemplateView.extend({
        el: ".container2",
        view: "todoDetails",
        initialize: function(options) {
            this.options = options;
            // this.listenTo(Parse, "newModelForDetailView", this.setModel)
            this.model && this.model.on("change", this.render.bind(this));
            this.collection && this.collection.on("add reset remove", this.render.bind(this));
        },
        setModel: function(model) {
            if (this.model === model) {
                this.model = null;
                this.el.innerHTML = "";
            } else {
                this.model = model;
                this.render();
            }
        }
    })

})(typeof module === "object" ? module.exports : window)
