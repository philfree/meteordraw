// Define Minimongo collections to match server/publish.js.
Graph = new Meteor.Collection("graphs");

if (Meteor.is_client) {

  Template.gauge.drawsomething = function () {
	  d3.select('h1').style("color", "green");
  };
  // ID of currently selected graph
  Session.set('graph_id', null);

  Template.gauge.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'

      // Draw a 200x200 svg blue box
      var vis = d3.select("#vis");
      var box = vis.append("svg");
      box.style('width', 200).style('height', 200);
    }
  };
}
