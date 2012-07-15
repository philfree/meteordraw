// Define Minimongo collections to match server/publish.js.
Graphs = new Meteor.Collection("graphs");
Circles = new Meteor.Collection("circles");
console.log("Audrey test");


if (Meteor.is_client) {

  Template.gauge.drawsomething = function () {
	  d3.select('h1').style("color", "green");
  };
  // ID of currently selected graph
  Session.set('graph_id', null);

  Meteor.subscribe('graphs', function () {
    if (!Session.get('graph_id')) {
	 console.log("no graph id value in session, doing nothing for now");
     var graph = Graphs.findOne({}, {sort: {name: 1}});
     if (graph)
        Router.setGraph(graph._id);
    }
  });

// Always be subscribed to the todos for the selected list.
  Meteor.autosubscribe(function () {
	  var graph_id = Session.get('graph_id');
	  if (graph_id)
		Meteor.subscribe('circles', graph_id);
  });

  Template.gauge.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
    'click #vis' : function (event) {
      console.log(event);
      console.log("You clicked!");
      var mysvg = d3.select("svg");
      mysvg.append("circle")
        .style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 40)
        .attr("cx", event.layerX)
        .attr("cy", event.layerY)
        .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mouseout", function(){d3.select(this).style("fill", "white");});
        Circles.insert({
		          graph_id: Session.get('graph_id'), 
		          cx: event.layerX,
		          cy: event.layerY }) ;
    }
  };
}

Template.graph_list.circle_pos = function () {
  var graph_id = this._id;
  return Circles.find({graph_id: graph_id}, {});
  //return _.map(this.tags || [], function (tag) {
  //  return {todo_id: todo_id, tag: tag};
  //});
};

   Template.graph_list.graph_all = function () {
	 console.log("template function: graph_all");
     return Graphs.find({}, {});
   };

var GraphRouter = Backbone.Router.extend({
  routes: {
    ":graph_id": "main"
  },
  main: function (graph_id) {
    Session.set("graph_id", graph_id);
  },
  setGraph: function (graph_id) {
    this.navigate(graph_id, true);
  }
});

Router = new GraphRouter;

Meteor.startup(function () {
    Backbone.history.start({pushState: true});
});
