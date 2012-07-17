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
      if (graph) {
        Router.setGraph(graph._id);
        Session.set("selected_graph", graph._id);
	  }
    }
  });

// Always be subscribed to the todos for the selected list.
  Meteor.autosubscribe(function () {
	  var graph_id = Session.get('selected_graph');
	  if (graph_id)
		Meteor.subscribe('circles', graph_id);
  });

  var draw_circle = function (cx, cy) {
    var mysvg = d3.select("svg");
    mysvg.append("circle")
      .style("stroke", "gray")
      .style("fill", "white")
      .attr("r", 40)
      .attr("cx", cx)
      .attr("cy", cy)
      .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
      .on("mouseout", function(){d3.select(this).style("fill", "white");});
  };

  Template.gauge.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
    'click #vis' : function (event) {
      console.log(event);
      console.log("You clicked!");

      Circles.insert({
	          graph_id: Session.get('selected_graph'),
	          cx: event.layerX,
	          cy: event.layerY }) ;
    }
  };

  Template.gauge.render_circles = function () {
    Meteor.defer(function () {
      var latest_circles = Circles.find({graph_id: Session.get('selected_graph')}, {});
      for (circle in latest_circles) {
        draw_circle(circle.cx, circle.cy);
      }
    });
  };
}

  Template.graph_list.circle_pos = function () {
    var graph_id = this._id;
    return Circles.find({graph_id: graph_id}, {});
  };

   Template.graph_list.graph_all = function () {
	 console.log("template function: graph_all");
     return Graphs.find({}, {});
   };

   Template.graph_list.events = {
    'click': function () {
	  console.log("Click event selecting Graph:"+this._id);
      Session.set("selected_graph", this._id);
      Router.setGraph(this._id);
    }
  };

  Template.add_graph.events = {
	'click input.add': function () {
	  var text = jQuery('#new-graph').val();
      var id = Graphs.insert({name: text});
      Router.setGraph(id);
      Session.set("selected_graph", id);
      jQuery('#new-graph').val('');
    }
  };

  Template.graph_list.selected = function () {
    return Session.equals("selected_graph", this._id) ? "selected" : '';
  };


var GraphRouter = Backbone.Router.extend({
  routes: {
    ":graph_id": "main"
  },
  main: function (graph_id) {
    Session.set("selected_graph", graph_id);
  },
  setGraph: function (graph_id) {
    this.navigate(graph_id, true);
  }
});

Router = new GraphRouter;

Meteor.startup(function () {
    Backbone.history.start({pushState: true});
});
