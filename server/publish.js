

Graphs = new Meteor.Collection("graphs");

// Publish complete set of lists to all clients.
Meteor.publish('graphs', function () {
  return Graphs.find();
});

// Todos -- {text: String,
// done: Boolean,
// tags: [String, ...],
// list_id: String,
// timestamp: Number}
Circles = new Meteor.Collection("circles");

// Publish all items for requested list_id.
Meteor.publish('circles', function (graph_id) {
  return Circles.find({graph_id: graph_id});
});
