# two-way-data-binding
Simple Two-Way Data Binding in Vanilla Javascript

# Demo

https://jsbin.com/sasigaxine/1/edit?html,js,output

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
    .innerHTML = JSON.stringify(scope, null, 5);
});

// get current scope object
bind.getScope();

// set scope manually
bind.setScope({ qty: 2, price: 2000 });

```
