# two-way-data-binding
Simple Two-Way Data Binding in Vanilla Javascript

# Demo

https://jsbin.com/zaponuv/edit?html,js,output

# usage

include script

```
<script src="app.js"></script>
```

```
var bind = new Binding('data-model');

// usage
// bind.run();

// with callback
bind.run(function(scope) {
  // display model somewhere
  document.getElementById('scope')
    .innerHTML = JSON.stringify(scope, null, 5); // pretty print
});

// get current scope object
bind.getScope();

// set scope manually
bind.setScope({ qty: 2, price: 2000 });

// or simple

bind.scope.qty = 2;
bind.scope.price = 3;

// set scope inside event
function doThat() {
  bind.scope.qty = 2;
  bind.scope.price = 3;
}
```
