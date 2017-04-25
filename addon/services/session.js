import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service('store'),
    apiKey: null,
    currentUser: null,
    init() {
        this._super(...arguments);
        if (localStorage.getItem('apiKey')) {
            this.set('apiKey', localStorage.getItem('apiKey'));

        }
    },

    setKey(key) {
        this.set('apiKey', key);
        // this.set('currentUser', this.get('store').peekRecord('user', 'current_user'));
        this.get('store').findRecord('user', 'current_user').then((user) => {
                this.set('currentUser', user);
            });
        localStorage.setItem('apiKey', key);
    },

    removeKey() {
        this.set('apiKey', null);
        this.set('currentUser', null);
        localStorage.removeItem('apiKey');
        this.get('store').unloadAll('user');
    },

    isAuthenticated() {
        return this.get('apiKey') != null;
    },

    // userChanged: function() {
    //     if (this.isAuthenticated() === true) {
    //         this.get('store').findRecord('user', 'current_user').then((user) => {
    //             this.set('currentUser', user);
    //         });
    //     }

    // }.on('init').observes('apiKey')
});
