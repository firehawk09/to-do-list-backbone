window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/lodash.min.js"},
        // {url: "./bower_components/backbone/backbone.js"},
        {url: "./bower_components/parse-js-sdk/lib/parse.min.js"},
        // {url: "./bower_components/react/react.min.js"},
        // {url: "./node_modules/jsnox/index.js"},
        {url: "./bower_components/pace/pace.min.js"},
        {url: "./js/TemplateView.js"},
        {url: "./js/toDoApp.js"}

    ).then(function(){
        document.querySelector("html").style.opacity = 1;
    // connect Parse
    Parse.initialize("GMGIvGwz3AHgHqE0tN9LeBrxnEuFxtLh1C4lTpYN", "cEw1oA2cNHJm2Jt6g1JmrW1q3ttNAIQEPNOW80Jt");
    // start app?
        new Parse.TodoRouter();
    })

}