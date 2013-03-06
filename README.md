# node-either

[![Build Status](https://secure.travis-ci.org/brianc/node-either.png?branch=master)](http://travis-ci.org/brianc/node-either)

Handle either one event or another one exactly once.

## api

`var either = require('either');`

### either(eventEmitter, fooEventName, fooListener, barEventName, barListener)


`eventEmitter` : object - an instance of EventEmitter
`fooEventName` : string - the name of the first event
`fooListener` : function - the listener to call if the first event fires first
`barEventName` : string - the name of the second event
`barListener` : function - the listener to call if the second event fires

All arguments are required.

## example

```js
var either = require('either');
var net = require('net');

var connect = function(address, callback) {
  var socket = net.connect(address);
  either(socket,
         'connect', function() {
           socket.setEncoding('utf8');
           callback(null, socket);
         },
         'error', callback);
}
```

## license
MIT
