import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        debugger;
        return this.store.findAll('station');
    }
});
