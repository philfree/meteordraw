
// loading default graphs

  Meteor.startup(function () {
	console.log("will check for Graphs...");
    if (Graphs.find().count() === 0) {
	  console.log("Graphs is empty adding a few");
      var names = ["Boxes",
                   "Gauge",
                   "test"];
      for (var i = 0; i < names.length; i++)
        Graphs.insert({name: names[i]});
    } else {		
		var top_graph = Graphs.find({}, {});
		var count = 0;
		top_graph.forEach(function (graph) {
		  console.log("Graph Names " + count + ": " + graph.name);
		  count += 1;
		});
		//Graphs.ForEach(graph) function 
	}

  });
