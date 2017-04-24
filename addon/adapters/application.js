import JSONAPIAdapter from 'ember-data/adapters/json-api';
import Ember from 'ember';
import DS from "ember-data";
import ENV from 'external-admin/config/environment';
const { underscore, pluralize } = Ember.String;

export default JSONAPIAdapter.extend({
    host: ENV.host,
   session: Ember.inject.service('session'),
   headers: Ember.computed('session.apiKey', function() {
       return {
           'Authorization': 'Bearer '+this.get('session.apiKey')
       };
   }),
   shouldReloadRecord() {
       return false;
    },

    shouldBackgroundReloadRecord() {
        return false;
    },

    pathForType: function(type) {
        let underscored = underscore(type);
        return pluralize(underscored);
    },

     // allows queries to be sent along with a findRecord
     // hopefully Ember / EmberData will soon have this built in
     // ember-data issue tracked here:
     // https://github.com/emberjs/data/issues/3596
     urlForFindRecord(id, modelName, snapshot) {
       let url = this._super(...arguments);
       let query = Ember.get(snapshot, 'adapterOptions.query');
       if(query) {
         url += '?' + Ember.$.param(query);
       }
       return url;
     },

     handleResponse(status, headers, body) {
         if (status === 401) {
             var error = {status: status, error: "fuck you"};
            return new Ember.RSVP.Promise(function(resolve, reject) {
                return reject(error);
            });
            //  return new DS.InvalidError(body.errors);
            // return new DS.UnauthorizedError(status, body);
         } else if (status === 500) {
             var error = {status: status, error: body.error};
            return new Ember.RSVP.Promise(function(resolve, reject) {
                return reject(error);
            });
         } else {
            return this._super(status, headers, body);
         }

     }

});
