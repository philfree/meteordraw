

Graphs = new Meteor.Collection("graphs");

// Publish complete set of lists to all clients.
Meteor.publish('graphs', function () {
	
  return Graphs.find();
});

