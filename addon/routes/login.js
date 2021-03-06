import Ember from 'ember';

export default Ember.Route.extend({

        isLoggingIn: false,

    setupController: function(controller, model) {
        debugger;
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        this.controller.set('isLoggingIn', false);
        var sess = this.get('session');
        sess.removeKey();
    },

    actions: {

        login() {
            this.controller.set('isLoggingIn', true);
            var email = this.controller.get('email');
            var password = this.controller.get('password');
            var that = this;
            var header = null;

            $.ajax({
                type: "POST",
                // url: "http://staging.9sdmsq8sir.us-east-1.elasticbeanstalk.com/login",
                url: "http://localhost:8080/api/auth/login",
                // url: "http://stage.api.fmex.io/login",
                contentType: "application/json",
                dataType: "json",
                async: false,
                data: JSON.stringify({username: email, password: password}),
                success: function(params, textStatus, jqXHR) {
                    debugger;
                    that.store.pushPayload(params);
                    header = jqXHR.getResponseHeader('Authorization');
                    var session = that.get('session');
                    session.setKey(header);
                    // that.transitionTo('rfis.new');

                },
                error: function(e) {
                    debugger;
                    console.log("Error" + e.status);
                    console.log(e.statusText);
                    var errors = that.controller.get('errors');
                    errors.pushObject("Username or password do not match. Please try again.");
                    that.controller.set('isLoggingIn', false);
                }

            });


        },

    },

    activate () {
       


        Ember.run.schedule('afterRender', function() {
             Ember.$('nav').addClass('hidden');
            Ember.$('.body').addClass('login');
        });

    },

    deactivate () {
        // Ember.$('body').removeClass('login');
        Ember.run.schedule('afterRender', function() {
            Ember.$('.body').addClass('login');
            Ember.$('nav').removeClass('hidden');
        });
        
        
    }
});
