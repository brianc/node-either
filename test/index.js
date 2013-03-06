var EventEmitter = require('events').EventEmitter;
var assert = require('assert');

var either = require(__dirname + '/../');

describe('either', function() {
  it('works with inline functions', function() {
    var e = new EventEmitter();
    var callCount = 0;
    either(e,
          'first', function(param1, param2, param3) {
            assert.equal(param1, 1);
            assert.strictEqual(param2, null);
            assert.equal(param3, 'three');
            callCount++;
          },
          'second', function(param1) {
            assert.fail('should not have called second callback');
          });

    e.emit('first', 1, null, 'three');
    assert.equal(callCount, 1);
    e.emit('first');
    assert.equal(callCount, 1);
    assert.equal(e.listeners('first').length, 0);
    assert.equal(e.listeners('second').length, 0);

    either(e, 'first', function() {
      assert.fail('should not have called first callback');
    }, 'second', function(param1, param2) {
      assert.equal(param1, 'one');
      assert.equal(param2, 'two');
      callCount++;
    });

    e.emit('second', 'one', 'two');
    assert.equal(callCount, 2);
    assert.equal(e.listeners('first').length, 0);
    assert.equal(e.listeners('second').length, 0);
  });

  it('works with named functions', function() {
    var firstCount = 0;
    var first = function() {
      firstCount++;
    };
    var secondCount = 0;
    var second = function() {
      secondCount++;
    };
    var e = new EventEmitter();
    either(e, 'first', first, 'second', second);
    e.emit('first');
    e.emit('first');
    e.emit('second');
    e.emit('second');
    assert.equal(firstCount, 1);
    assert.equal(secondCount, 0);
    either(e, 'first', first, 'second', second);
    e.emit('second');
    e.emit('first');
    e.emit('first');
    e.emit('second');
    assert.equal(firstCount, 1);
    assert.equal(secondCount, 1);
  });
});
