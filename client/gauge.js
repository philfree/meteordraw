// Define Minimongo collections to match server/publish.js.
Graph = new Meteor.Collection("graphs");
console.log("Audrey test");


if (Meteor.is_client) {

  Template.gauge.drawsomething = function () {
	  d3.select('h1').style("color", "green");
  };
  // ID of currently selected graph
  Session.set('graph_id', null);

  Meteor.subscribe('graphs', function () {
    if (!Session.get('graph_id')) {
     var graph = Graphs.findOne({}, {sort: {name: 1}});
     if (graph)
        Router.setList(graph._id);
    }
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
    }
  };
}
