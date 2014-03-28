define("js/routes/people", 
  ["js/models/person","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Person = __dependency1__["default"];

    var PeopleRoute = Ember.Route.extend({
        model: function() {
            return Person.find();
        }
    });

    __exports__["default"] = PeopleRoute;
  });