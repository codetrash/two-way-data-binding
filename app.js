// Simple two-way data Binding
// @author budy k
// @todo add capability for select-muiltiple
// @todo add expression, callback-prop

function Binding(selector, scope) {
    // the attribute to bind
    this.selector = selector || 'model';
    // scope
    this.scope = scope || {};
    // list allowed input type
    this.allowedInputs = [
      'text', 'textarea', 'select-one', 'radio', 'checkbox', 'hidden'
    ];
    // assign certain input to certain event
    this.allowedAventsPair = {
      keyup: ['text', 'textarea'],
      change: ['select-one', 'radio', 'checkbox']
    };

}

// run it
// @param {callback} next
Binding.prototype.run = function(next) {
  var self = this;
  var elements = document.querySelectorAll('['+self.selector+']');
  if (elements) {
      elements.forEach(function(element) {
        //execute scope setter
        if (self.allowedInputs.indexOf(element.type) > -1 ) {
          var propToBind = element.getAttribute(self.selector);
          // set property scope, except radio buttons..they need special treatment
          if (element.type !== 'radio') {
            self.addScopeProp(elements, propToBind);
          }
           // on Events
           Object.keys(self.allowedAventsPair).forEach(function(event) {
             // check if input type is part of current event
             if (self.allowedAventsPair[event].indexOf(element.type) > -1) {
               // execute event
               element.addEventListener(event, function(e) {
                 var nval = element.value;
                 if (element.type === 'checkbox') {
                   if (e.target.checked) {
                     nval = 'on';
                   } else {
                     nval = 'off';
                   }
                 }
                 // add to scope
                 self.scope[propToBind] = nval;
                 // special for radio input, must add scope from here
                 // as radio utilize same-name property
                 if (element.type === 'radio') {
                   // add prop to current scope
                   self.addScopeProp(elements, propToBind);
                 }

                 return next(self.scope);
               });
             }
           });
        }

    });
  }
  return next(self.scope);
};

// binding property with setter getter
// @param {object} Elements
// @param {string} prop property
Binding.prototype.addScopeProp = function(elements, prop) {
  var self = this;
  // if scope not defined yet, create it
  if (!self.scope.hasOwnProperty(prop)) {
    var value;
    Object.defineProperty(self.scope, prop, {
      set: function (newValue) {
        value = newValue;
        elements.forEach(function (element) {
          if (element.getAttribute(self.selector) === prop) {
            if (self.allowedInputs.indexOf(element.type) > -1 ) {
              element.value = newValue;
            }
            else if (!element.type){
              element.innerHTML = newValue;
            }
          }
        });
      },
      get: function() {
        return value;
      },
      enumerable: true
    });
  }
};

// set scope manually
// @param {string} prop property
Binding.prototype.setScope = function(prop) {
  var self = this;
  Object.keys(prop).forEach(function(item) {
    self.scope[item] = prop[item];
  });
};

// get current scope
// @return {object} current scope
Binding.prototype.getScope = function() {
  return this.scope;
};

// create instance
var bind = new Binding('data-model');

// usage
// bind.run();

// or run with callback
bind.run(function(scope) {
  document.getElementById('scope')
    .innerHTML = JSON.stringify(scope, null, 2); // pretty print
});
