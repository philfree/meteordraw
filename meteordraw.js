if (Meteor.is_client) {
  Template.hello.greeting = function () {
    return "Welcome to meteordraw.";
  };
  Template.hello.drawsomething = function () {
	  d3.select('#mydrawboard').style("color", "green");
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      d3.select("body").style("background-color", "black");
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
