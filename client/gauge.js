// Define Minimongo collections to match server/publish.js.
Graph = new Meteor.Collection("graphs");

if (Meteor.is_client) {

  Template.gauge.drawsomething = function () {
	  d3.select('h1').style("color", "green");
  };
  // ID of currently selected graph
  Session.set('graph_id', null);

  Meteor.subscribe('graphs', function () {
    if (!Session.get('graph_id')) {
	 console.log("no graph id value in session, doing nothing for now");
   //  var graph = Graphs.findOne({}, {sort: {name: 1}});
   //  if (graph)
  //      Router.setGraph(graph._id);
    }
  });

  Template.gauge.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
      // Draw a 200x200 svg blue box
      var vis = d3.select("#vis");
      var box = vis.append("svg");
      box.style('width', 200).style('height', 200);
    }
  };
}

//var GraphRouter = Backbone.Router.extend({
//  routes: {
//    ":graph_id": "main"
//  },
//  main: function (graph_id) {
//    Session.set("graph_id", graph_id);
//  },
//  setGraph: function (graph_id) {
//    this.navigate(graph_id, true);
//  }
//});

//Router = new GraphRouter;

//Meteor.startup(function () {
//    Backbone.history.start({pushState: true});
//});
