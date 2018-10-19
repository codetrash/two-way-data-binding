// Simple two=way data Binding
// @author budy k
// @todo add capability for select-muiltiple
// @todo add expression, callback-prop

function Binding(selector, scope) {
    this.selector = selector || 'model';
    this.scope = scope || {};
    // list allowed input type
    this.allowedInputs = [
      'text', 'textarea', 'select-one', 'radio', 'checkbox',
      'hidden'
    ];
    // assign certain input to certain event
    this.allowedAventsPair = {
      keyup: ['text', 'textarea'],
      change: ['select-one', 'radio', 'checkbox']
    };
   
}

Binding.prototype.run = function(next) {
  var self = this;
  var elements = document.querySelectorAll('['+self.selector+']');
  if (elements) {
      elements.forEach(function(element) {
        //execute scope setter
        if (self.allowedInputs.indexOf(element.type) > -1 ) {
          var propToBind = element.getAttribute(self.selector);                    
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
                 // add prop to current scope       
                 self.addScopeProp(elements, propToBind);
          
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
Binding.prototype.setScope = function(prop) {
  var self = this;
  Object.keys(prop).forEach(function(item) {
    self.scope[item] = prop[item];
  });
};

// get current scope
Binding.prototype.getScope = function() {
  return this.scope;
};

var bind = new Binding('data-model');

// usage
// bind.run();

// with callback
bind.run(function(scope) {
  document.getElementById('scope')
    .innerHTML = JSON.stringify(scope, null, 5);
});

