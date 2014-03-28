define("js/controllers/people", 
  ["js/models/person","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Person = __dependency1__["default"];

    var PeopleController = Ember.ArrayController.extend({
        actions: {
            addPerson: function() {
                var person = {
                    firstName: this.get('firstName'),
                    lastName: this.get('lastName')
                };
                Person.add(person);
            },
            deletePerson: function(person) {
                Person.remove(person);
            }
        }
    });

    __exports__["default"] = PeopleController;
  });