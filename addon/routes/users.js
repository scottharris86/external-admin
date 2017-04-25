import Ember from 'ember';

export default Ember.Route.extend({
    // store: Ember.inject.service(),
    model() {
        debugger;
        return this.store.findAll('station');
    }
});
