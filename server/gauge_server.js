
// loading default graphs

  Meteor.startup(function () {
    if (Graphs.find().count() === 0) {
      var names = ["Boxes",
                   "Gauge"];
      for (var i = 0; i < names.length; i++)
        Graphs.insert({name: names[i]});
    }
  });
