import Person from 'js/models/person';

export default Ember.Route.extend({
    model: function() {
        return Person.find();
    }
});
