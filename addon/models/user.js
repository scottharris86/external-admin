import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import { hasMany, belongsTo } from 'ember-data/relationships';

export default Model.extend({
    firstName: attr(),
    lastName: attr(),
    email: attr(),
    // account: belongsTo('account'),

    fullName: Ember.computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    // userRoles: hasMany('UserRole'),

    // isAdmin: Ember.computed('userRoles', function() {
    //     let roles = this.get('userRoles');
    //     var check = false;
    //     roles.forEach((item, index) => {
            
    //         if (item.get('name') === "ADMIN") {
    //             check = true;
    //         }
            
            
    //     });
    //     return check;
        
    // })

});